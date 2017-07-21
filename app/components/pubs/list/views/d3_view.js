import template from '../templates/d3.jst'
import * as d3 from 'd3';
import {gc} from '../../../radio'
import data from './data.json'

var D3View = Mn.View.extend({
  tagName: 'div',
  className: 'd3',
  template: template,

  events: {
  'change select.form-control': 'submitClicked'
  },

  onAttach: function() {
    var filter = 'directedAtPub'
    this.runD3(filter)
  },

  submitClicked: function(e){
  e.preventDefault();
  //serialize the form data//
  var formdata = Backbone.Syphon.serialize(this);
  var filter = formdata.filter
  this.runD3(filter)
  },

  runD3: function(filter) {
    d3.selectAll("svg > *").remove();
    var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));
  var root = data
  var myLinks = root.links[filter];
  console.log(myLinks);
  
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
    .enter().append("circle")
      .attr("r", 5)
      .attr("fill", function(d) { 
        var inRhizomeNumeric = d.inRhizome.substr(1);
        return color(inRhizomeNumeric);
      })
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));
  node.append("title")
      .text(function(d) { return d.id; });
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