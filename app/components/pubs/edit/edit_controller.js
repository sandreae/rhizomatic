import {Mixed} from './views/mixed_view'
import {Image} from './views/image_view'
import {Script} from './views/script_view'
import {gc} from '../../radio'

var Controller = {
    editPub: function (id) {
      // request the pub model via API handler using the 'id' argument passed from the router//
      var fetchingPubModel = gc.request('pub:get', id)
      $.when(fetchingPubModel).done(function(pubModel){

        // grab pub type and instantiate appropriate view//
        var editPubContentView
        var type = pubModel.get('type')
        if (type === 'mixed'){
          editPubContentView = new Mixed({
            model: pubModel
          })}
        if (type === 'image'){ 
          editPubContentView = new Image({
            model: pubModel
          })}
        if (type === 'script'){
          editPubContentView = new Script({
            model: pubModel
          })}

      // on 'form:submit' save form content to existing or new draft, then save pub//
        editPubContentView.on('form:submit', function (content) {
          // find draft for current type//
          var drafts = pubModel.get('drafts')
          var draft = drafts.findWhere({type: type})
          draft.set({content: content})
          pubModel.set({activeContent: content})
          console.log(pubModel)
          pubModel.save(null, {
            success: function () {
              gc.trigger('pub:show', pubModel.get('_id'))
            }
          })
        })
        Platform.Regions.getRegion('main').show(editPubContentView)
      })
    }
  }
export {Controller}
