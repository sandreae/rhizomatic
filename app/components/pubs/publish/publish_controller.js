import {View} from './views/publish_view'
import {gc} from '../../radio'

var Controller = {
  publish: function(id) {
    var fetchingPub = gc.request('pub:get', id)
    $.when(fetchingPub).done(function (pub) {
      console.log('published triggered')
      console.log(pub)
      var publishView = new View({
        model: pub
      })

      // on 'form:submit' set pub details//
      publishView.on('form:submit', function (data) {
        data.tags = data.tags.split(', ')
        data.directedAt.split(', ')
        console.log(data)
        pub.set({published: true})
        if (pub.save(data)) {
          gc.trigger('user:listPubs')
        } else {
          publishView.triggerMethod('form:data:invalid', pub.validationError);
        }
      })
      gc.trigger('sidebar:show', publishView)
    })
  }
}

export {Controller}