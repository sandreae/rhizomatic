import template from '../templates/d3.jst'
import * as d3 from 'd3';
import {gc} from '../../../radio'

var D3View = Mn.View.extend({
  tagName: 'div',
  className: 'd3-container',
  template: template,

  events: {
  'mouseenter circle.d3-pubs': 'pubHovered',
  'mouseleave circle.d3-pubs': 'pubLeft'
  },

  pubHovered: function(e){
    var pubId = e.currentTarget.children[0].textContent
    var thisPub = this.collection.get({_id: pubId})
    var pubDate = new Date(thisPub.get('publishedDate'))
    const pubInfo = document.querySelector('.pub-info-container')
    pubInfo.innerHTML =  '<h2>' + thisPub.get('title') + '</h2><h3>by ' + thisPub.get('contributor') + '</h3><p>published: ' + pubDate.toDateString() + '</p>'
    const start = window.performance.now()
    const duration = 1000
    pubInfo.style.display = 'block'
    window.requestAnimationFrame(function fadeIn (now) {
      const progress = now - start
      pubInfo.style.opacity = progress / duration

      if (progress < duration) {
        window.requestAnimationFrame(fadeIn)
      }
    })
  },

  pubLeft: function(e){
    const pubInfo = document.querySelector('.pub-info-container')
    pubInfo.style.display = 'none'
  },

  onAttach: function() {
    this.runD3()
    $('#js-main-region').localize()
  },

  submitClicked: function(e){
  e.preventDefault();
  this.runD3()
  },

  getData: function() {
    var pubs = this.collection
    var pubsJSON = pubs.toJSON()

    var tags = pubsJSON.map(function(pub, index, array){
      var x
      if (pub.published === 'true') {
        tags = pub.tags.map(function(tag){
          return tag
        })
        return tags
      }
    })

    tags = _.uniq(_.flatten(tags))
    tags = tags.map(function(tag) {
      if (tag !== undefined){
        return {
          id: tag, 
          group: 'd3-tags',
          size: '2',
          strength: '0'
        }
      }
    });
    var tagNodes = tags.filter(function(obj) {
      return (obj !== undefined)
    });

    console.log(tagNodes)

    var tagLinks = pubsJSON.map(function(pub, index, array){
      var x
      if (pub.published === 'true') {
        var connection = pub.tags.map(function(element){
          x = {
            rhizome: pubs.get({_id: pub._id}).get('inRhizome'),
            source: pub._id,
            target: element,
            width: 1,
          }
          return x
        })
        return connection
      }
    })


    var tagLinks = _.flatten(_.compact(tagLinks))

    console.log(tagLinks)

    var nodes = pubsJSON.map(function(pub, index, array){
      pub.id = pub._id
      pub.group = 'd3-pubs'
      pub.size = 10
      pub.strength = 1
      pub.url = 'http://' + window.location.host + '/#publication/' + pub._id
      pub.rhizome = pub.inRhizome
      return pub
    })

    nodes = nodes.filter(function(obj) {
      return (obj.published === 'true')
    });

    console.log(nodes)

    var directedAtPub = nodes.map(function(pub, index, array) {
      var invitedBy = {
        rhizome: pubs.get({_id: pub.invitedByPubId}).get('inRhizome'),
        source: pub.invitedByPubId,
        target: pub._id,
        width: 3
      }
      return invitedBy
    })

    nodes = nodes.concat(tagNodes)

    directedAtPub = directedAtPub.filter(function(link) {
      return link.source !== '' || link.source !== 'seed pub'
    })

    directedAtPub  = directedAtPub.concat(tagLinks)

    // directedAtPub = directedAtPub.concat(tagLinks)
    var data = {}
    var links = {}
    links.directedAtPub = directedAtPub
    data.nodes = nodes
    data.links = links
    console.log(data)
    return data
  },

  runD3: function() {

    const container = $('#d3-content')
    var width = container.width()
    var height = container.height()
    var self = this
    d3.selectAll("svg > *").remove();

    var svg = d3.select("svg")
    .attr('viewBox','0 0 '+ width +' '+ height )
    .call(d3.zoom().on("zoom", function () {
      svg.attr("transform", d3.event.transform)
    }))
    .append("g")

    var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody().strength(-100).distanceMin(60).distanceMax(300))
    .force('x', function(d) { return d.strength; })
    .force('y', function(d) { return d.strength; })
  
  var root = self.getData()

  var myLinks = root.links.directedAtPub;
  
  var link = svg.append("g")
      .attr("class", 'links')
    .selectAll("line")
    .data(myLinks)
    .enter().append("line")
      .attr("class", function(d) { return d.rhizome})
      .attr("stroke-width", function(d) { return d.width });

  var node = svg.append("g")
      .attr("class", "nodes")
    .selectAll("circle")
    .data(root.nodes)
    .enter()      
    .append("svg:a")
      .attr("xlink:href", function(d){if(d.url !== undefined) {return d.url}})
    .append("circle")
      .attr("r", function(d) { return d.size; })
      .attr("class", function(d) { return d.group + " " + d.rhizome})

      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));


  node.append("id")
      .text(function(d) { return d.id });

  simulation
      .nodes(root.nodes)
      .on("tick", ticked);
  simulation.force("link")
      .links(myLinks);

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x  + width / 2; })
        .attr("y1", function(d) { return d.source.y  + height / 2; })
        .attr("x2", function(d) { return d.target.x  + width / 2; })
        .attr("y2", function(d) { return d.target.y + height / 2; });
    node
        .attr("cx", function(d) { return d.x  + width / 2; })
        .attr("cy", function(d) { return d.y + height / 2; });
  }


function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}
function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}
function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}
  }

});

export {D3View}