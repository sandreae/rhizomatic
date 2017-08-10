export default Mn.AppRouter.extend({
  appRoutes: {
    'publications/:id': 'showPub',
    'publications': 'listPubs',
    'publications/new': 'newPub',
    'publications/edit/:id': 'editPubContent',
    'publications/userlist': 'userListPubs'
  },
});
