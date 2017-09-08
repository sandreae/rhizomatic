import {gc} from '../../../components/radio'

var AppState = Backbone.Model.extend({
});

var appState

var initAppState = function() {
  appState = new AppState({userName: null, loggedIn: false, isAdmin: false, tags: [], contributors: []});
  console.log('APP STATE INIT')
  gc.request('pubs:get').then(function(pubs) {
    gc.request('users:get').then(function(users) {
      var pubsJSON = pubs.toJSON()
      var allTags = pubsJSON.map(function(pub, index, array){
        var tags
        if (pub.published === 'true') {
          tags = pub.tags.map(function(tag){
            return tag
          })
          return tags
        }
      })
      var tagPool = _.flatten(allTags).filter( function( item, index, inputArray ) {
        return inputArray.indexOf(item) == index;
      });

      var allContribs = users.pluck('contributorNames')
      var contributors = _.flatten(allContribs).filter( function( item, index, inputArray ) {
         return inputArray.indexOf(item) == index;
      });

      appState.set({
        tags: tagPool,
        contributors: contributors
      })
      return appState
    })
  })
};

var refreshAppState = function() {
  appState = new AppState({userName: null, loggedIn: false, isAdmin: false, tags: [], contributors: []});
  console.log('APP STATE INIT')
  gc.request('pubs:get').then(function(pubs) {
    gc.request('users:get').then(function(users) {
      var pubsJSON = pubs.toJSON()
      var allTags = pubsJSON.map(function(pub, index, array){
        var tags
        if (pub.published === 'true') {
          tags = pub.tags.map(function(tag){
            return tag
          })
          return tags
        }
      })
      var tagPool = _.flatten(allTags).filter( function( item, index, inputArray ) {
        return inputArray.indexOf(item) == index;
      });

      var allContribs = pubs.pluck('contributor')
      var contributors = _.flatten(allContribs).filter( function( item, index, inputArray ) {
         return inputArray.indexOf(item) == index;
      });
      appState.set({
        tags: tagPool,
        contributors: contributors
      })
    return appState
    })
  })
}

var AppStateAPI = {
  getAppState: function() {
    return new Promise((resolve, reject) => {
      if (appState === undefined) {
        initAppState();
      }
      resolve(appState);
    })
  },
  getAppStateForced: function() {
    return new Promise((resolve, reject) => {
      refreshAppState();
      resolve(appState);
    })
  }
};


export {AppState, AppStateAPI}
