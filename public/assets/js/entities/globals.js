Platform.module("Entities", function(Entities, Platform, Backbone, Marionette, $, _){


	Entities.Globals = {
		auth: {
		  TOKEN_KEY: 'authToken',
		  USER_KEY: 'userId'
		},
		urls: {
		    AUTHENTICATE: 'http://localhost:3000/api/authenticate',
		    APP_INFO: 'http://localhost:3000/api/applicationInfo'
		}

	}

});

