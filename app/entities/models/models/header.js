
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
    {id: '1', name: 'publications', url: 'publications', navigationTrigger: 'pubs:list', admin: false},
    {id: '2', name: 'about', url: 'about', navigationTrigger: 'about:show', admin: false },
    {id: '3', name: 'users', url: 'users', navigationTrigger: 'users:list', admin: true }
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
