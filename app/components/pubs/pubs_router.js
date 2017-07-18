export default Mn.AppRouter.extend({
  appRoutes: {
    'publications/:id': 'showPub',
    'publications': 'listPubs',
    'publications/new/': 'newPub',
    'publications/:id/edit/details': 'editPubDetails'
  },
});
