import Ember from 'ember'

export default Ember.Controller.extend({
  queryParameters: ['page'],
  page: 1,
  size: 15,

  actions: {
    goto(page) {
      this.set('page', page)
    }
  }
})
