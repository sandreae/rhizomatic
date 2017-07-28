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
      var fetchingPubModel = gc.request('pub:get', id)
      $.when(fetchingPubModel).done(function(pubModel){

        // grab pub type and instantiate appropriate view//
        var editSidebarView = new ImageSidebar()
        var editPubContentView
        var type = pubModel.get('type')
        if (type === 'mixed') {
          editPubContentView = new Mixed({
            model: pubModel
          })
          editSidebarView = new MixedSidebar({
            model: pubModel
          })
        }
        if (type === 'image') {
          editPubContentView = new Image({
            model: pubModel
          })
          editSidebarView = new ImageSidebar({
            model: pubModel
          })
        }
        if (type === 'script') {
          editPubContentView = new Script({
            model: pubModel
          })
          editSidebarView = new ScriptSidebar({
            model: pubModel
          })
        }
        Platform.Regions.getRegion('main').show(editPubContentView)
      })
    },

  editPubSidebar: function (id) {
    // request the pub model via API handler using the 'id' argument passed from the router//
    var fetchingPubModel = gc.request('pub:get', id)
    $.when(fetchingPubModel).done(function(pubModel){

      // grab pub type and instantiate appropriate view//
      var editSidebarView = new ImageSidebar()
      var editPubContentView
      var type = pubModel.get('type')
      if (type === 'mixed') {
        editSidebarView = new MixedSidebar({
          model: pubModel
        })
      }
      if (type === 'image') {
        editSidebarView = new ImageSidebar({
          model: pubModel
        })
      }
      if (type === 'script') {
        editSidebarView = new ScriptSidebar({
          model: pubModel
        })
      }

      editSidebarView.on('form:submit', function (content, data) {
        var drafts = pubModel.get('drafts')
        var draft = drafts.findWhere({type: type})
        draft.set({content: content})
        pubModel.set({
          activeContent: content,
          contributor: data.contributor,
          title: data.title,
          tags: data.tags,
        })
        pubModel.save(null, {
          success: function() {
            gc.trigger('pub:show', pubModel.get('_id'))
          }
        })
      })
      gc.trigger('sidebar:show', editSidebarView)
    })
  }
}
export {Controller}
