/* eslint-env node */
module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'adminv2',
    environment: environment,
    rootURL: '/',
    locationType: 'history',
    EmberENV: {FEATURES: {}},

    APP: {},

    API: {
      baseURL: 'http://localhost:3000',
      namespace: 'v2'
    },

    i18n: {
      defaultLocale: 'de'
    },

    'ember-simple-auth': {
      authenticationRoute: 'login',
      refreshAccessTokens: true,
      serverTokenEndpoint: 'http://localhost:3000/v2/oauth/token'
    },

    'googleMap': {
      apiKey: 'AIzaSyAu1CsFWmS3inDPJGmkzXwWG_Gc1EHf93U',
      libraries: ['places']
    }
  }

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true
    // ENV.APP.LOG_ACTIVE_GENERATION = true
    // ENV.APP.LOG_TRANSITIONS = true
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true
    // ENV.APP.LOG_VIEW_LOOKUPS = true
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.rootURL = '/'
    ENV.locationType = 'none'

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false
    ENV.APP.LOG_VIEW_LOOKUPS = false

    ENV.APP.rootElement = '#ember-testing'
  }

  return ENV
}
