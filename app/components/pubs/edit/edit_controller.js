import editSidebarPicker from './helpers/edit_sidebar_picker'
import editViewPicker from './helpers/edit_view_picker'
import {gc} from '../../radio'

var Controller = {
  editPub: function (id) {
    var fetchingpub = gc.request('pub:get', id)
    $.when(fetchingpub).done(function(pub){
      var type = pub.get('type')
      var editPubContentView = editViewPicker(pub, type)
      Platform.Regions.getRegion('main').show(editPubContentView)
    })
  },

  editPubSidebar: function (id) {
    var fetchingpub = gc.request('pub:get', id)
    $.when(fetchingpub).done(function(pub){
      var type = pub.get('type')
      var editSidebarView = editSidebarPicker(pub, type)

      editSidebarView.on('form:submit', function (content, data, pubModel) {
        var newDraft = new Platform.Entities.Pubs.Draft()

        if (data.tags === '') {data.tags = []} else {data.tags = data.tags.split(', ')}
        if (data.directedAt === '') {data.directedAt = []} else {data.directedAt = data.directedAt.split(', ')}
        var drafts = pubModel.get('drafts')
        var draft = drafts.findWhere({type: type})
        draft.set({content: content})

        pubModel.set({
          activeContent: content,
        })

        if (data.type !== type) {
          newDraft.set({
            type: data.type,
            pub: pubModel.get('_id')
          })
          drafts.add(newDraft)
        }
        pubModel.set({
          contributor: data.contributor,
          title: data.title,
          type: data.type,
          tags: data.tags,
          directedAt: data.directedAt,
        })
        if (pubModel.save(null, {
          success: function(response){
            if (pubModel.get('type') === type) {
              gc.trigger('user:home')
              gc.trigger('pubs:list')
              gc.trigger('sidebar:close')
            } else {
              gc.trigger('pub:content:edit', pubModel.get('_id'))
            }
            if (pubModel.get('published') === true) {
              console.log('publish = true')
              Controller.publish(pubModel)}
          },
        })) {console.log('save success')} else {
          editSidebarView.triggerMethod('form:data:invalid', pubModel.validationError);
          pubModel.set({published: false})
          pubModel.save()
        }
      })
      gc.trigger('sidebar:show', editSidebarView)
    })
  },

  newInvitedPub: function(model) {
    console.log('newInvitedPub triggered')

    console.log(model)
    var invitedUsers = model.get('directedAt')
    var fetchingUsers = gc.request('users:get')

    $.when(fetchingUsers).done(function(users) {
      console.log(users)
      invitedUsers.forEach(function(userName) {
        if (userName.includes('@')) {console.log('send email to', userName)}
        var invitedUserModels = users.where({userName: userName})
        console.log(invitedUserModels)
        invitedUserModels.forEach(function (userModel) {
          console.log(userModel)
          var userId = userModel.get('_id')

        })
      })
    })
  },

  publish: function(pubModel) {
    console.log('publish triggered')
    var user = gc.request('user:getCurrentUser')
    var contributorName = pubModel.get('contributor')
    var contributors = user.get('contributorNames')
    contributors.push(contributorName)
    console.log(contributors)
    user.set({contributorNames: contributors})
    user.save(null,{
      success: function(response){
        console.log(response)
      }
    })
    gc.trigger('sidebar:close')
  }
}
export {Controller}
