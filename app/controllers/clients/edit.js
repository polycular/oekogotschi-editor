import Ember from 'ember'
const {run, isBlank} = Ember

export default Ember.Controller.extend({
  store: Ember.inject.service(),

  selectedUser: null,

  searchUser(term, resolve, reject) {
    if (isBlank(term)) {
      return resolve([])
    }

    return this.store
      .query('user', {filter: `name LK '${term}%' OR email LK '${term}%'`})
      .then(users => resolve(users))
      .catch(reject)
  },

  actions: {

    save() {
      const client = this.get('model.client')
      client.save()
    },

    search(term) {
      return new Ember.RSVP.Promise((resolve, reject) => {
        if (Ember.isBlank(term)) {
          return resolve([])
        }

        run.debounce(this, this.searchUser, term, resolve, reject, 600)
      })
    }
  }

})
