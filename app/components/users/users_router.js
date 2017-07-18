export default Marionette.AppRouter.extend({
  appRoutes: {
    'login': 'showLogin',
    'logout': 'logoutUser',
    'users/list': 'listUsers',
    'users/:id/edit': 'editUser',
    'newuser': 'newUser'
  }
})
