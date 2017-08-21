import Ember from 'ember'
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin'

export default Ember.Route.extend(ApplicationRouteMixin, {
  fetchCurrentUser() {
    const {user_id} = this.get('session.data.authenticated')
    return this.store
      .findRecord('user', user_id, {include: 'clients'})
      .then(user => this.get('currentUser').set('content', user) && user)
  },

  beforeModel(transition) {
    this._super(transition)
    if (this.get('session.isAuthenticated')) {
      return this.fetchCurrentUser()
    }
  },

  sessionAuthenticated() {
    this.fetchCurrentUser().then(() => {
      this.transitionTo('/')
    }).catch(() => this.get('session').invalidate())
  },

  actions: {
    logout() {
      this.get('session').invalidate()
    }
  }

})
