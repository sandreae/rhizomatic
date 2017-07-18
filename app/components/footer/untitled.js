var User = Marionette.View.extend({
  template: '#user-name',
  tagName: 'footer',
  className: 'footer',

  serializeData: function () {
    var model = this.model

    return {
      userName: model.get('userName'),
      admin: gc.request('getPermissions:entities')
    }
  }
})