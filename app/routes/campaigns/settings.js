import Ember from 'ember'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    const campaign = this.store.findRecord(
      'campaign',
      params.campaign_id
    )

    return Ember.RSVP.hash({
      campaign,
      projects: this.store.query('project', {client: this.get('session.currentClient.id'), page: { limit: 1000}}),
    })
  }
})
