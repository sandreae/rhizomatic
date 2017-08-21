import editSidebarPicker from './helpers/edit_sidebar_picker'
import editViewPicker from './helpers/edit_view_picker'
import {gc} from '../../radio'

var Controller = {
  editPub: function (id) {
    gc.request('pub:get', id).then(function(pub){
      var type = pub.get('type')
      var editPubContentView = editViewPicker(pub, type)
      Platform.Regions.getRegion('main').show(editPubContentView)
    })
  },

  editPubSidebar: function (id) {
    gc.request('pub:get', id).then(function(pub){
      var type = pub.get('type')
      var editSidebarView = editSidebarPicker(pub, type)

      editSidebarView.on('silent:save', function (content, data, pubModel) {
        console.log('silent save')

        var drafts = pubModel.get('drafts')
        var draft = drafts.findWhere({type: type})
        if (data.tags === '') {data.tags = []} else {data.tags = data.tags.split(', ')}
        if (data.directedAt === '') {data.directedAt = []} else {data.directedAt = data.directedAt.split(', ')}

        draft.set({content: content})
        pubModel.set({activeContent: content})

        if (!pubModel.save(data, {
          success: function() {
            alertify.success('publication saved');
            console.log(pubModel)
            gc.trigger('pub:show', pubModel.get('_id'))
            gc.trigger('sidebar:close')
            gc.trigger('user:listPubs')
          },
          error: function() {
            alertify.success('unknown server error')
            alertify.success('publication not saved')
          }
        }))
        {
          editSidebarView.triggerMethod('form:data:invalid', pubModel.validationError)
          pubModel.set({published: false})
          console.log('pub not published because of validation error')
        }
      })
      
      editSidebarView.on('form:submit', function (content, data, pubModel) {

        var newType = data.type
        var newDraft = new Platform.Entities.Pubs.Draft()
        var drafts = pubModel.get('drafts')
        var draft = drafts.findWhere({type: type})
        var nextDraft = drafts.findWhere({type: newType})
        if (draft !== undefined) {
          draft.set({content: content})
          pub.set({activeContent: content})
        }
        if (data.tags === '') {data.tags = []} else {data.tags = data.tags.split(', ')}
        if (data.directedAt === '') {data.directedAt = []} else {data.directedAt = data.directedAt.split(', ')}
        Controller.saveDraft(editSidebarView, pubModel, content, draft, drafts, data, nextDraft, newDraft, newType, type)

      })
      gc.trigger('sidebar:show', editSidebarView)
    })
  },

  newInvitedPub: function(pubModel) {
    var self = this
    var invitedUsers = pubModel.get('directedAt')
    gc.request('users:get').then(function(users) {
      gc.request('pubs:get').then(function(pubs) {

        invitedUsers.forEach(function(contributor) {
          var invitedUserModel

          invitedUserModel = users.findWhere(function(model){
            return (_.indexOf(model.get('contributorNames'), contributor) >= 0 );
          });

          if (invitedUserModel === undefined) {
            if (contributor.includes('@')){
            console.log('send email to', contributor)
            self.emailNewUser(contributor, pubModel.get('contributor'))
            invitedUserModel = new Platform.Entities.Users.User({
              userName: contributor,
              email: contributor,
              password: 'password'
            })
            console.log(invitedUserModel)    
            }
          }
          var pendingList = invitedUserModel.get('pendingPub')
          pendingList.push({
            invitedByContrib: pubModel.get('contributor'),
            invitedByContribId: pubModel.get('contributorId'),
            invitedByPub: pubModel.get('title'),
            invitedByPubId: pubModel.get('_id'),
            inRhizome: pubModel.get('inRhizome')
          })
          invitedUserModel.set({
            pendingPub: pendingList
          })
          invitedUserModel.save(null, {
            success: function(res) {
              console.log(res)
              gc.trigger('user:listPubs')
              gc.trigger('pub:show', pubModel.get("_id"))
              alertify.success('publication published!')
            },
          })
        })
      })
    })
  },

  publish: function(pubModel) {
    Controller.saveContributorName(pubModel)
    gc.trigger('sidebar:close')
  },

  saveContributorName: function(pubModel) {
    gc.request('user:get', window.localStorage.userId).then(function(user) {
      var contributorName = pubModel.get('contributor')
      var contributors = user.get('contributorNames')
      if (!contributors.includes(contributorName)) {contributors.push(contributorName)}
      contributors = _.flatten(contributors)
      user.set({contributorNames: contributors})
      user.save(null, {
        success: function() {
          console.log('user saved with new contributor names')
          Controller.newInvitedPub(pubModel)
        }
      })
    })
  },

  newDraft: function(pubModel, newDraft, drafts, newType) {
    newDraft.set({
      type: newType,
      pub: pubModel.get('_id')
    })
    newDraft.set({content: ''})
    pubModel.set({activeContent: ''})
    drafts.add(newDraft)
    pubModel.set({
      drafts: drafts,
      type: newType,
      activeContent: '',
    })
    pubModel.save(null).then(function(){
      gc.trigger('pub:content:edit', pubModel.get('_id'))
    })
  },

  saveDraft: function(editSidebarView, pubModel, content, draft, drafts, data, nextDraft, newDraft, newType, type) {
    if (!pubModel.save(data, {
      success: function() {
          alertify.success('publication saved');
      }
    })) {
      editSidebarView.triggerMethod('form:data:invalid', pubModel.validationError)
      pubModel.set({published: false})
      console.log('pub not published because of validation error')
    } else {
      if (pubModel.get('published') === true){
        pubModel.set({
          activeContent: content,
          publishedDate: Date()
        })
        pubModel.save(null).then(function(){
          Controller.publish(pubModel)
        })
      } else {
        if (nextDraft === undefined) {
          console.log('newDraft triggered')
          Controller.newDraft(pubModel, newDraft, drafts, newType)
        } else {
          console.log('changeDraft triggered')
          if (type !== newType) {
            Controller.changeDraft(pubModel, nextDraft, newType)
          } else {
            pubModel.set({activeContent: content})
            pubModel.save(null).then(function(){
              gc.trigger('pub:content:edit', pubModel.get('_id'))
            })
          }
        }
      }
    }
  },

  changeDraft: function(pubModel, nextDraft, newType) {
    var nextContent = nextDraft.get('content')
    pubModel.set({
      type: newType,
      activeContent: nextContent,
    })
    pubModel.save(null).then(function() {
      gc.trigger('pub:content:edit', pubModel.get('_id'))
    })
  },

  emailNewUser: function(contributor, invitedBy) {
    const xhr = new XMLHttpRequest();
    var inviteText = invitedBy + ' invited you to respond to their publication.'
    xhr.open('GET', '/api/send?to=' + contributor + '&subject=Welcome To Rhizomatic&text=' + inviteText);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          alertify.error('invite sent to' + contributor)
        }
        else {
          alertify.error('sorry, upload failed')
        }
      }
    };
    xhr.send();
  },
}
export {Controller}
