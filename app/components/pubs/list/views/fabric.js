import template from '../templates/d3_3d.jst'
import * as fabric from 'ngraph.fabric'
import ngraph from 'ngraph.graph'
import {gc} from '../../../radio'

var D3View = Mn.View.extend({
  tagName: 'div',
  className: 'd3',
  template: template,

  events: {
  'change select.form-control': 'submitClicked'
  },

  onAttach: function() {
  // let's create a simple graph with two nodes, connected by edge: 
  var graph = ngraph()
  graph.addLink(1, 2);
  console.log(graph)
 console.log(fabric)
  // Create a fabric renderer: 
  var fabricGraphics = fabric();
 
  // And launch animation loop: 
  fabricGraphics.run();
  },

  submitClicked: function(e){
  e.preventDefault();
  this.runD3()
  },

  getData: function() {
    var pubs = this.collection
    var pubsJSON = pubs.toJSON()
    var directedAtPub = pubsJSON.map(function(pub, index, array){
      var invitedBy = {
        source: pub.invitedByPubId,
        target: pub._id
      }
      return invitedBy
    })
    var links = directedAtPub.filter(function(link) {
      return link.source !== ''
    })
    var nodes = pubsJSON.map(function(pub, index, array){
      pub.id = pub._id
      return pub
    })
    var data = {}
    data.nodes = nodes
    data.links = links

    return data
  },

});

export {D3View}