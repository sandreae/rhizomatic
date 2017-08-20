import template from '../templates/d3_3d.jst'
import ForceGraph3D from '3d-force-graph';
import {gc} from '../../../radio'
import THREE from 'three'

var D3View = Mn.View.extend({
  tagName: 'div',
  className: 'd3',
  template: template,

  events: {
  'change select.form-control': 'submitClicked'
  },

  onAttach: function() {
    var self = this
    var myGraph = ForceGraph3D();
    myGraph(document.getElementById("3d-graph"))
    .forceEngine(['d3'])
    .graphData(this.getData())
    .nodeResolution([8])
    .onNodeClick(function(node){console.log(node)})
    console.log(myGraph.state)
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