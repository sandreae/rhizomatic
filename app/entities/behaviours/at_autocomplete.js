import {gc} from '../../components/radio'
import 'es-selectize/dist/js/standalone/selectize.js'

var AtAutocomplete = Mn.Behavior.extend({

  onAtautocomplete: function(directedAt, errors) {
    console.log(directedAt)
    var appState = gc.request('appState:get')
    var contributors = appState.get('contributors')
    var options = contributors.concat(directedAt)
    var items = options.map(function(x) { return { item: x }; });
    $('#pub-directedAt').selectize({    
      delimiter: ', ',
      persist: false,
      options: items,
      labelField: "item",
      valueField: "item",
      sortField: 'item',
      searchField: 'item',
      items: directedAt,
      create: function(input) {
        return {
          value: input,
          text: input,
          item: input,
        }
      }
    })
  },
});

export {AtAutocomplete}
