
var AppState = Backbone.Model.extend({
});

var appState

var initAppState = function() {
  appState = new AppState({userName: 'visitor', loggedIn: false, isAdmin: true});
  return appState
};

var AppStateAPI = {
  getAppState: function() {
    if (appState === undefined) {
      initAppState();
    }
    return appState;
  }
};

export {AppState, AppStateAPI}
