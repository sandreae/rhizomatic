import {gc} from '../../../components/radio'

var AppState = Backbone.Model.extend({
});

var appState

var initAppState = function() {
  appState = new AppState({userName: 'visitor', loggedIn: true, isAdmin: true, tags: [], contributors: []});
  $.when(gc.request('pubs:get')).done(function(pubs) {
    var allTags = pubs.pluck('tags')
    var tagPool = _.flatten(allTags)
    var allContribs = pubs.pluck('contributor')
    var contributors = _.flatten(allContribs)
    appState.set({
      tags: tagPool,
      contributors: contributors
    })
  })
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
