
var headers

var Header = Backbone.Model.extend({
  initialize: function(){
    /* var selectable = new Backbone.Picky.Selectable(this);
    _.extend(this, selectable); */
  }
});


var Headers = Backbone.Collection.extend({
  model: Header,

  initialize: function() {
    /* var singleSelect = new Backbone.Picky.SingleSelect(this);
    _.extend(this, singleSelect); */
  }
});


var initializeHeaders = function() {
  headers = new Headers([
    {id: '1', name: 'Publications', url: 'publications', navigationTrigger: 'pubs:list', admin: false},
    {id: '2', name: 'About', url: 'about', navigationTrigger: 'about:show', admin: false },
    {id: '3', name: 'Users', url: 'users', navigationTrigger: 'users:list', admin: true },
//  {id: '4', name: 'Rhizomes', url: 'rhizomes', navigationTrigger: 'rhizomes:list', admin: true },
    {id: '5', name: 'Login', url: 'login', navigationTrigger: 'login:clicked', admin: false },
  ]);
  return headers
};

var HeadersAPI = {
  getHeaders: function() {
    if (headers === undefined) {
      initializeHeaders();
    }
    return headers;
  }
};

export {Header, Headers, HeadersAPI}
