import Ember from 'ember'
import config from './config/environment'

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
})

Router.map(function() {
  this.route('login')
  this.route('projects', {path: '/projects'}, function() {
    this.route('edit', {path: '/:project_id'})
  })
  this.route('campaigns', function() {
    this.route('edit', {path: '/:campaign_id'})
    this.route('settings', {path: '/:campaign_id/settings'})
  })
  this.route('clients', function() {
    this.route('edit', {path: '/:client_id'})
  })
  this.route('users', function() {
    this.route('edit', {path: '/:user_id'})
  })
  this.route('templates', function() {
    this.route('edit', {path: '/:template_id'})
  })
  this.route('help')
  this.route('api')
  this.route('logs')
  this.route('page-not-found', {path: '/*wildcard'})
})

export default Router
