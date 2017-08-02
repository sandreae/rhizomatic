import {View} from './views/publish_view'
import {gc} from '../../radio'

var Controller = {
  publish: function(id) {
    var fetchingPub = gc.request('pub:get', id)
    $.when(fetchingPub).done(function (pub) {
      var publishView = new View({
        model: pub
      })

      // on 'form:submit' set pub details//
      publishView.on('form:submit', function (data) {
        data.tags = data.tags.split(', ')
        data.directedAt.split(', ')
        pub.set({published: true})

        pub.save(null, {
        	success: function() {
              gc.trigger('user:listPubs')
              gc.trigger('sidebar:close')
        	},
        	error: function() {
        	  publishView.triggerMethod('form:data:invalid', pub.validationError)
        	  pub.set({published: false})
        	  pub.save(null, {
        	    success: function(response) {
                  console.log(pub)
        	},

        	  })
        	}
        });
      })
      gc.trigger('sidebar:show', publishView)
    })
  }
}

export {Controller}