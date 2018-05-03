/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'foursquare-client-ember',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };



  if (environment === 'development') {
    ENV.foursquareHost = 'https://api.foursquare.com/v2';
    ENV.contentSecurityPolicy = {
      'img-src': "'self' data:",
      'connect-src': "'self' http://localhost:4200 https://api.foursquare.com/v2/"
    };
    ENV['ember-cli-mirage'] = {
      enabled: false
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    ENV.foursquareHost = 'http://localhost:4200';
    ENV.clientId = 'test';
    ENV.clientSecret = 'test';
    ENV.apiVersion = 'test';
  }

  if (environment === 'production') {
    ENV.foursquareHost = 'https://api.foursquare.com/v2';
    ENV.contentSecurityPolicy = {
      'img-src': "'self' data:",
      'connect-src': "'self' https://api.foursquare.com/v2/"
    };
  }

  return ENV;
};
