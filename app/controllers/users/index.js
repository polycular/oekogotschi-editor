import Ember from 'ember'

export default Ember.Controller.extend({
  queryParameters: ['page'],
  page: 1,
  size: 15,
  filter: null,
  filterText: null,

  actions: {
    goto(page) {
      this.set('page', page)
    },

    filter() {
      this.set('filter', this.get('filterText'))
    }
  }
})
