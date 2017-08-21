import Ember from 'ember'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  queryParams: {
    clientId: {
      refreshModel: true
    }
  },

  model(params) {
    const currentUser = this.get('currentUser')
    const hash = {
      projects: this.store.query('project', {page: {limit: 1000}})
    }

    if (params.clientId) {
      hash.client = this.store.find('client', params.clientId)
    } else if (this.get('session.currentClient')) {
      hash.client = this.get('session.currentClient')
    } else {
      hash.client = currentUser.get('clients.firstObject')
    }

    return Ember.RSVP.hash(hash)
  },
  afterModel(model, transition) {
    this._super(transition)
    this.get('session').set('currentClient', model.client)
  }
})
