import {gc} from '../../components/radio'
import 'es-selectize/dist/js/standalone/selectize.js'

var NamesAutocomplete = Mn.Behavior.extend({

  onNamesautocomplete: function(name) {
    gc.request('user:get', window.localStorage.userId).then(function(currentUser){
      var names = currentUser.get('contributorNames')
      names.push(name)
      var items = names.map(function(x) { return { item: x }; });
      $('#pub-contributor').selectize({
        maxItems: 1,
        delimiter: ', ',
        persist: false,
        options: items,
        labelField: "item",
        valueField: "item",
        sortField: 'item',
        searchField: 'item',
        item: name,
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

export {NamesAutocomplete}
