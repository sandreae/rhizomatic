import template from '../templates/d3.jst'
import * as d3 from 'd3';
import {gc} from '../../../radio'

var D3View = Mn.View.extend({
  tagName: 'div',
  className: 'd3',
  template: template,

  events: {
  'change select.form-control': 'submitClicked'
  },

  onAttach: function() {
    this.runD3()
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
          x = {id: tag, group: 'd3-tags'}
          return x
        })
        return tags
      }
    })

    var tagNodes = [{
      'id': 'new', 
      'group': 'd3-tags', 
      'size': '1',
      'strength': '0.01'
    }, 
    {
      'id': 'test', 
      'group': 'd3-tags', 
      'size': '1',
      'strength': '0.01'
    },
    {
      'id': 'one', 
      'group': 'd3-tags', 
      'size': '1',
      'strength': '0.01'
    }]

    // get rid of dublicates //

    console.log(tagNodes)

    var tagLinks = pubsJSON.map(function(pub, index, array){
      var x
      if (pub.published === 'true') {
        var connection = pub.tags.map(function(element){
          x = {
            source: pub._id,
            target: element,
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
      pub.strength = 0.5
      pub.url = 'http://' + window.location.host + '/#publication/' + pub._id
      return pub
    })

    nodes = nodes.filter(function(obj) {
      return (obj.published === 'true')
    });

    console.log(nodes)

    var directedAtPub = nodes.map(function(pub, index, array) {
      var invitedBy = {
        source: pub.invitedByPubId,
        target: pub._id
      }
      return invitedBy
    })

    nodes = nodes.concat(tagNodes)

    directedAtPub = directedAtPub.filter(function(link) {
      return link.source !== '' || links.source !== 'seed pub'
    })

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
    var self = this
    d3.selectAll("svg > *").remove();
    var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force('x', function(d) { return d.strength; })
    .force('y', function(d) { return d.strength; });
  var root = self.getData()
  var myLinks = root.links.directedAtPub;
  
  var link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(myLinks)
    .enter().append("line")
      .attr("stroke-width", function(d) { return Math.sqrt(d.value); });
  var node = svg.append("g")
      .attr("class", "nodes")
    .selectAll("circle")
    .data(root.nodes)
    .enter()      
    .append("svg:a")
      .attr("xlink:href", function(d){if(d.url !== undefined) {return d.url}})
    .append("circle")
      .attr("r", function(d) { return d.size; })
      .attr("class", function(d) { return d.group; })

      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  node.append("title")
      .text(function(d) { if(d.title !== undefined) {return d.title;} else {return d.id } });
  simulation
      .nodes(root.nodes)
      .on("tick", ticked);
  simulation.force("link")
      .links(myLinks);


  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
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