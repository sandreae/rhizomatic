import {Markdown} from './views/markdown_view'
import {Collage} from './views/collage_view'
import {Script} from './views/script_view'
import {Audio} from './views/audio_view'
import {Image} from './views/image_view'
import {CollageSidebar} from './views/collage_sidebar'
import {MarkdownSidebar} from './views/markdown_sidebar'
import {ScriptSidebar} from './views/script_sidebar'
import {AudioSidebar} from './views/audio_sidebar'
import {ImageSidebar} from './views/image_sidebar'
import {gc} from '../../radio'

var Controller = {
    editPub: function (id) {
      // request the pub model via API handler using the 'id' argument passed from the router//
      var fetchingpub = gc.request('pub:get', id)
      $.when(fetchingpub).done(function(pub){

        // grab pub type and instantiate appropriate view//
        var editPubContentView
        var type = pub.get('type')
        if (type === 'markdown') {
          editPubContentView = new Markdown({
            model: pub
          })
        }
        if (type === 'collage') {
          editPubContentView = new Collage({
            model: pub
          })
        }
        if (type === 'script') {
          editPubContentView = new Script({
            model: pub
          })
        }
        if (type === 'audio') {
          editPubContentView = new Audio({
            model: pub
          })
        }
        if (type === 'image') {
          editPubContentView = new Image({
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
      var editSidebarView = new CollageSidebar()
      var type = pub.get('type')
      if (type === 'markdown') {
        editSidebarView = new MarkdownSidebar({
          model: pub
        })
      }
      if (type === 'collage') {
        editSidebarView = new CollageSidebar({
          model: pub
        })
      }
      if (type === 'script') {
        editSidebarView = new ScriptSidebar({
          model: pub
        })
      }
      if (type === 'audio') {
        editSidebarView = new AudioSidebar({
          model: pub
        })
      }
      if (type === 'image') {
        editSidebarView = new ImageSidebar({
          model: pub
        })
      }

      editSidebarView.on('form:submit', function (content, data, pubModel) {
        var newDraft = new Platform.Entities.Pubs.Draft()

        if (data.tags !== "") {data.tags = data.tags.split(', ')}
        if (data.directedAt !== "") { data.directedAt.split(', ')}
        var drafts = pubModel.get('drafts')
        var draft = drafts.findWhere({type: type})
        draft.set({content: content})

        pubModel.set({
          activeContent: content,
          contributor: data.contributor,
          title: data.title,
          tags: data.tags,
          directedAt: data.directedAt
        })

        if (data.type !== type) {
          console.log('pubtype does not match')
          newDraft.set({
            type: data.type,
            pub: pubModel.get('_id')
          })
          drafts.add(newDraft)
        }

        if (pubModel.save(data)) {
          if (pubModel.get('type') === type) {
            gc.trigger('user:home')
            gc.trigger('pubs:list')
            gc.trigger('sidebar:close')
          } else {
            gc.trigger('pub:content:edit', pubModel.get('_id'))
          }
          if (pubModel.get('published') === true) {gc.trigger('sidebar:close')}
        } else {
          editSidebarView.triggerMethod('form:data:invalid', pubModel.validationError);
          pubModel.set({published: false})
          pub.save()
        }
      })
      gc.trigger('sidebar:show', editSidebarView)
    })
  }
}
export {Controller}
