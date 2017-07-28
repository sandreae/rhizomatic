import {Mixed} from './views/mixed_view'
import {Image} from './views/image_view'
import {Script} from './views/script_view'
import {ImageSidebar} from './views/image_sidebar'
import {MixedSidebar} from './views/mixed_sidebar'
import {ScriptSidebar} from './views/script_sidebar'
import {gc} from '../../radio'

var Controller = {
    editPub: function (id) {
      // request the pub model via API handler using the 'id' argument passed from the router//
      var fetchingpub = gc.request('pub:get', id)
      $.when(fetchingpub).done(function(pub){

        // grab pub type and instantiate appropriate view//
        var editSidebarView = new ImageSidebar()
        var editPubContentView
        var type = pub.get('type')
        if (type === 'mixed') {
          editPubContentView = new Mixed({
            model: pub
          })
          editSidebarView = new MixedSidebar({
            model: pub
          })
        }
        if (type === 'image') {
          editPubContentView = new Image({
            model: pub
          })
          editSidebarView = new ImageSidebar({
            model: pub
          })
        }
        if (type === 'script') {
          editPubContentView = new Script({
            model: pub
          })
          editSidebarView = new ScriptSidebar({
            model: pub
          })
        }
        Platform.Regions.getRegion('main').show(editPubContentView)
      })
    },

  editPubSidebar: function (id) {
    // request the pub model via API handler using the 'id' argument passed from the router//
    var fetchingpub = gc.request('pub:get', id)
    $.when(fetchingpub).done(function(pub){

      // grab pub type and instantiate appropriate view//
      var editSidebarView = new ImageSidebar()
      var editPubContentView
      var type = pub.get('type')
      if (type === 'mixed') {
        editSidebarView = new MixedSidebar({
          model: pub
        })
      }
      if (type === 'image') {
        editSidebarView = new ImageSidebar({
          model: pub
        })
      }
      if (type === 'script') {
        editSidebarView = new ScriptSidebar({
          model: pub
        })
      }

      editSidebarView.on('form:submit', function (content, data, pubModel) {
        var drafts = pubModel.get('drafts')
        var draft = drafts.findWhere({type: type})
        draft.set({content: content})
        pubModel.set({
          activeContent: content,
          contributor: data.contributor,
          title: data.title,
          tags: data.tags,
        })
        if (pubModel.save(data)) {
          gc.trigger('pubs:list')
        } else {
          editSidebarView.triggerMethod('form:data:invalid', pubModel.validationError);
        }
      })
      gc.trigger('sidebar:show', editSidebarView)
    })
  }
}
export {Controller}
