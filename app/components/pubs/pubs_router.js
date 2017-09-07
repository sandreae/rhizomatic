import {Authentication} from '../../entities/authentication/authentication'
import {gc} from '../radio'

export default Mn.AppRouter.extend({
  appRoutes: {
    'publication/:id': 'showPub',
    'rhizomes': 'listPubs',
    'publication/new': 'newPub',
    'publication/:id/edit': 'editPubContent',
    'user/publications': 'userListPubs',
    'user/invites': 'userInvites'
  },

  execute: function(callback, args, name) {
      if (Authentication.getKey() !== null) {
        if (callback) callback.apply(this, args);  
      } else {
        if (name === 'listPubs'  || name === 'showPub') {
	      if (callback) callback.apply(this, args);  
        } else {
        gc.trigger('user:home')
        gc.trigger('pubs:list')
      }
    }
  }
});
