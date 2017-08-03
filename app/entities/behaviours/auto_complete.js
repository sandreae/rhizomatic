import {gc} from '../../components/radio'

var Autocomplete = Mn.Behavior.extend({

  onDomRefresh: function() {
    this.triggerMethod('autocomplete')
  },

  onAutocomplete: function(errors) {
    var appState = gc.request('appState:get')
    var tagPool = appState.get('tags')
    var contributors = appState.get('contributors')
    $('#pub-tags').autocomplete({
      source: tagPool
    })
    $('#pub-directedAt').autocomplete({
      source: contributors
    })
  },
});

export {Autocomplete}
