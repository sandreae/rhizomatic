var Invite = Backbone.Model.extend({
});

var Invites = Backbone.Collection.extend({
  model: Invite,
});

var initInvites = function(pendingPubs) {
  var invites = new Invites(pendingPubs);
  return invites
};

var InvitesAPI = {
  getInvites: function(pendingPubs) {
  	var invites = initInvites(pendingPubs);
    return invites
  }
};

export {InvitesAPI}
