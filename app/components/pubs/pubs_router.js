import {PubsApp} from './pubs_app'

var PubsRouter = Mn.AppRouter.extend({
  controller: PubsApp.Radio,
    appRoutes: {
      'publications/:id': 'showPub',
      'publications/new/': 'newPub',
      'publications/:id/edit/details': 'editPubDetails'
    },
  });

var pubsRouter = new PubsRouter()

export {pubsRouter}