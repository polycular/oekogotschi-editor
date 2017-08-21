import Ember from 'ember'

export default Ember.Component.extend({

  tagName: 'ul',
  classNames: ['pagination', 'bootpag', 'pagination-flat', 'pagination-sm'],

  padding: 2,
  amount: function() {
    return this.get('padding') * 2 + 1
  }.property('padding'),

  max: function() {
    return Math.max(1, Math.floor(this.get('total') / this.get('size')))
  }.property('size', 'total'),

  offset: function() {
    const max = this.get('max')
    const page = this.get('page')
    const padding = this.get('padding')

    const paddingLeft = Math.max(1, page - padding)
    const paddingRight = Math.min(max, page + padding)
    const fix = paddingRight - paddingLeft - 2 * padding
    return Math.max(1, paddingLeft + fix)
  }.property('page', 'max'),

  isFirst: function() {
    const page = this.get('page')
    return page <= 1
  }.property('page', 'total', 'size'),

  isLast: function() {
    const page = this.get('page')
    const max = this.get('max')
    return page === max
  }.property('page', 'max'),

  hasManyPages: function() {
    const max = this.get('max')
    return max >= 10
  }.property('max'),

  range: function() {
    const page = this.get('page')
    const amount = this.get('amount')
    const max = this.get('max') > amount ? amount : this.get('max')
    const offset = this.get('offset')
    const range = new Array(max).fill(false)
    range[page - offset] = true
    return Ember.A(range)
  }.property('page', 'max'),

  actions: {
    goto(page) {
      if (page === 'next') {
        page = this.get('page') + 1
      } else if (page === 'prev') {
        page = this.get('page') - 1
      }

      this.set('page', page)

      this.sendAction('gotoPage', page)
    }
  }

})
