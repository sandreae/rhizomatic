import {gc} from '../../components/radio'
import 'es-selectize/dist/js/standalone/selectize.js'

var TagsAutocomplete = Mn.Behavior.extend({

  onTagsautocomplete: function(tags, errors) {
    gc.request('appState:get').then(function(appState){
      var tagPool = appState.get('tags')
      var options = tagPool.concat(tags)
      var items = options.map(function(x) { return { item: x }; });
      $('#pub-tags').selectize({    
        delimiter: ', ',
        persist: false,
        options: items,
        labelField: "item",
        valueField: "item",
        sortField: 'item',
        searchField: 'item',
        items: tags,
        create: function(input) {
          return {
            value: input,
            text: input,
            item: input,
          }
        }
      })
    })
  },
});

export {TagsAutocomplete}
