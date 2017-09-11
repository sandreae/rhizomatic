import editSidebarPicker from './helpers/edit_sidebar_picker'
import editViewPicker from './helpers/edit_view_picker'
import emailcontent from './templates/email.jst'
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
        type = pubModel.get('type')
        var drafts = pubModel.get('drafts')
        var draft = drafts.findWhere({type: type})
        if (data.tags === '') {data.tags = []} else {data.tags = data.tags.split(', ')}
        if (data.directedAt === '') {data.directedAt = []} else {data.directedAt = data.directedAt.split(', ')}
      
        draft.set({content: content})
        pubModel.set({activeContent: content})

        if (!pubModel.save(data, {
          success: function() {
            alertify.success($.i18n.t('alertify.pub-saved'));
            gc.trigger('pub:show', pubModel.get('_id'))
            gc.trigger('sidebar:close')
            gc.trigger('user:listPubs')
          },
          error: function() {
            alertify.success($.i18n.t('alertify.pub-not-saved'))
          }
        }))
        {
          editSidebarView.triggerMethod('form:data:invalid', pubModel.validationError)
          console.log('pub not published because of validation error')
          pubModel.set({published: false})
        }
      })
      
      editSidebarView.on('form:submit', function (content, data, pubModel) {
        type = pubModel.get('type')
        var newType = data.type
        var newDraft = new Platform.Entities.Pubs.Draft()
        var drafts = pubModel.get('drafts')
        var draft = drafts.findWhere({type: type})
        var nextDraft = drafts.findWhere({type: newType})
        if (data.tags === '') {data.tags = []} else {data.tags = data.tags.split(', ')}
        if (data.directedAt === '') {data.directedAt = []} else {data.directedAt = data.directedAt.split(', ')}
        
        draft.set({content: content})
        pubModel.set({activeContent: content})  

        if (!pubModel.save(data, {
          success: function() {
            alertify.success($.i18n.t('alertify.pub-saved'));
            Controller.saveDraft(editSidebarView, pubModel, content, draft, drafts, data, nextDraft, newDraft, newType, type)
          },
          error: function() {
            alertify.success($.i18n.t('alertify.pub-not-saved'))
          }
        }))
        {
          editSidebarView.triggerMethod('form:data:invalid', pubModel.validationError)
          console.log('pub not published because of validation error')
          pubModel.set({published: false})
        }
      })
      gc.trigger('sidebar:show', editSidebarView)
    })
  },

  newInvitedPub: function(pubModel) {
    gc.trigger('pubs:list')
    console.log('new invited pub triggered')
    var self = this
    var invitedUsers = pubModel.get('directedAt')
    var pubTitle = pubModel.get('title')
    gc.request('users:get').then(function(users) {
      gc.request('pubs:get').then(function(pubs) {

        invitedUsers.forEach(function(contributor) {
          var invitedUserModel
          var pendingList = []

          var x = users.findWhere(function(model){
            return (_.indexOf(model.get('contributorNames'), contributor) >= 0 );
          })

          var y = users.findWhere({email: contributor})

          if (x !== undefined) {
            console.log('user found by contributor name ' + x.get('userName'))
            invitedUserModel = x
            pendingList = invitedUserModel.get('pendingPub')
          }

          if (y !== undefined) {
            console.log('user found by email ' + y.get('userName'))
            invitedUserModel = y
            pendingList = invitedUserModel.get('pendingPub')
          }

          if (x === undefined && y === undefined) {
            console.log('user does not exist')
            if (contributor.includes('@')) {
              console.log('create and invite new user: ' + contributor)
              self.emailUser(contributor, pubModel.get('contributor'), true, pubTitle)
              invitedUserModel = new Platform.Entities.Users.User({
                userName: contributor,
                email: contributor,
                password: 'password'
              })
            console.log(invitedUserModel)    
            } else {
              console.log('invite email address invalid')
            }
          } else {
            console.log('invite ' + invitedUserModel.get('userName') + ' to respond')
            self.emailUser(invitedUserModel.get('email'), pubModel.get('contributor'), false, pubTitle)
          }

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
            success: function() {
              gc.trigger('user:listPubs')
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
    console.log('save contributor triggered')
    gc.request('user:get', window.localStorage.userId).then(function(user) {
      var contributorName = pubModel.get('contributor')
      var contributors = user.get('contributorNames')
      if (!contributors.includes(contributorName)) {contributors.push(contributorName)}
      contributors = _.flatten(contributors)
      user.set({contributorNames: contributors})
      user.save(null, {
        success: function() {
          console.log('user saved with new contributor names')
          Controller.newRhizome(pubModel)
        }
      })
    })
  },

  newRhizome: function(pubModel) {
    gc.request('rhizomes:get').then(function(rhizomes) {
      var inRhizome = pubModel.get('inRhizome')
      console.log(inRhizome)
      if (inRhizome === null) {
        console.log('create new rhizome for seed pub')
        var rhizome = new Platform.Entities.Rhizomes.Rhizome({rhizomeName: 'new'})
        var x = rhizomes.length
        var newRhizome = '00' + x
        rhizome.set({rhizomeName: newRhizome})
        pubModel.set({inRhizome: newRhizome})
        rhizome.save(null, {})
        pubModel.save(null, {
          success: function() {Controller.newInvitedPub(pubModel)}
        })
      } else {Controller.newInvitedPub(pubModel)}
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
    console.log('new draft save pub')
    console.log(pubModel)
    pubModel.save(null, {
      success: function() {
        gc.trigger('pub:content:edit', pubModel.get('_id'))
      }
    })
  },

  saveDraft: function(editSidebarView, pubModel, content, draft, drafts, data, nextDraft, newDraft, newType, type) {
    if (pubModel.get('published') === 'true'){
      console.log('publish triggered')
      pubModel.set({publishedDate: Date()})
      pubModel.save(null, {
        success: function() {
          Controller.publish(pubModel)
          alertify.success($.i18n.t('alertify.pub-published'))
        }
      })
    } else {
      if (nextDraft === undefined) {
        console.log('newDraft triggered')
        Controller.newDraft(pubModel, newDraft, drafts, newType)
      } else {
        if (type !== newType) {
          console.log('changeDraft triggered')
          Controller.changeDraft(pubModel, nextDraft, newType)
        } else {
          console.log('publication saved');
          gc.trigger('pub:content:edit', pubModel.get('_id'))
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
    pubModel.save(null, {
      success: function() {
        gc.trigger('pub:content:edit', pubModel.get('_id'))
      }
    })
  },

  emailUser: function(contributor, invitedBy, isNew, pubTitle) {
    var email
    var subject
    var emailNewUser = `<h1>Welcome To Rhizomatic</h1> <p>Welcome to Rhizome, an online space and community for sharing, communication, and discussion.</p><p>You have been invited by <b>` + invitedBy + `</b> to respond to their publication <b>` + pubTitle + `</b>.<br/>You can accept the invitation and create a response in a variety of formats (markdown, collage, url, audio, video, image) by visiting the Rhizomatic website and logging in:<br/><br><a href="http://www.rhizomatic.community">http://www.rhizomatic.community</a></p>username: ` + contributor + `<br>password: password<br>(please change this when you log in for the first time)<br><p>When creating a new publication, you can invite any number of existing, or new, users to respond to your publication.</p>`

    var emailUser = `<h1>Rhizomatic</h1> <p>You have been invited by <b>` + invitedBy + `</b> to respond to their publication <b>` + pubTitle + `</b>.<br/> You can accept the invitation and create a response in a variety of formats (markdown, collage, url, audio, video, image) by visiting the Rhizomatic website and logging in with your existing profile details.<br/><br><a href="http://www.rhizomatic.community">http://www.rhizomatic.community</a></p><p>When creating a new publication, you can invite any number of existing, or new, users to respond to your publication.</p>`

    if (isNew === true) {
      email = emailNewUser
      subject = 'Welcome To Rhizomatic'
    } else {
      email = emailUser
      subject = 'Rhizomatic: new publication request'
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/send?to=' + contributor + '&from=contact@rhizomatic.community&subject=' + subject + '&html=' + email);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          alertify.success($.i18n.t('alertify.invite-sent-to') + ' ' + contributor)
        }
        else {
          alertify.error($.i18n.t('alertify.invite-failed') + ' ' + contributor)
        }
      }
    };
    xhr.send();
  },
}
export {Controller}
