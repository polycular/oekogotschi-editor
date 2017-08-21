import Ember from 'ember'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  store: Ember.inject.service(),

  model(params) {
    return Ember.RSVP.hash({
      client: this.store.findRecord('client', params.client_id)
    })
  }
})
