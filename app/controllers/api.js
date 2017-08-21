import Ember from 'ember'
import config from '../config/environment'

export default Ember.Controller.extend({
  url: function() {
    return `${config.API.baseURL}/${config.API.namespace}/docs`
  }.property()
})
