export default Mn.AppRouter.extend({
  appRoutes: {
    'publications/:id': 'showPub',
    'publications': 'listPubs',
    'publicationsd3': 'd3Pubs',
    'publications/new/': 'newPub',
    'publications/:id/edit/details': 'editPubDetails',
    'publications/:id/edit/content': 'editPubContent'
  },
});
