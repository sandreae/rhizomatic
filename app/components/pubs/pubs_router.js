export default Mn.AppRouter.extend({
  appRoutes: {
    'publications/:id': 'showPub',
    'publications': 'listPubs',
    'publications/new': 'newPub',
    'publications/details/:id': 'editPubDetails',
    'publications/edit/:id': 'editPubContent'
  },
});
