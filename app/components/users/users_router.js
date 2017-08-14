export default Marionette.AppRouter.extend({
  appRoutes: {
    'users': 'listUsers',
    'users/:id/edit': 'editUser',
    'newuser': 'newUser',
    'publications/user/home': 'showHome',
  }
})
