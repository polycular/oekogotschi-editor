import Ember from 'ember'
import Resolver from './resolver'
import loadInitializers from 'ember-load-initializers'
import config from './config/environment'

let App

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
})

loadInitializers(App, config.modulePrefix)

Ember.onerror = (error) => {
  const url = `${config.API.baseURL}/${config.API.namespace}/logs`
  Ember.$.ajax(url, {
    type: 'POST',
    data: {
      data: {
        type: 'log',
        attributes: {
          message: error.message,
          detail: error.stack
        }
      }
    }
  })
}

// Ember is strange - will produce medium out of media
// Sourec: https://stackoverflow.com/questions/24884015/ember-data-pluralisation-strange-behavior
Ember.Inflector.inflector.singular(/([ti])a$/i, '$1a')
Ember.Inflector.inflector.plural(/([ti])a$/i, '$1as')

export default App
