import Ember from 'ember'

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  store: Ember.inject.service(),

  fetchCurrentUser() {
    const {user_id} = this.get('session.data.authenticated')
    return this.store
      .findRecord('user', user_id, {include: 'clients'})
      .then(user => this.get('currentUser').set('content', user) && user)
  },

  actions: {
    authenticate() {
      const {username, password} = this.getProperties('username', 'password')
      return this
        .get('session')
        .authenticate('authenticator:oauth2', username, password)
        .catch(err => this.set('error', err.message))
    }
  }
})
