import Ember from 'ember'

export default Ember.Component.extend({
  routing: Ember.inject.service('-routing'),

  classNameBindings: ['active'],

  tagName: 'li',
  direction: 'asc',

  active: function() {
    const attribute = this.get('attribute')
    const current = this.get('current')
    const [attributeName] = current.split(':')
    return attribute === attributeName
  }.property('attribute', 'current'),

  actions: {
    toggleSort() {
      const attribute = this.get('attribute')

      let direction = this.get('direction')
      direction = direction === 'asc' ? 'desc' : 'asc'
      this.set('direction', direction)

      const sort = `${attribute}:${direction}`

      const router = this.get('routing.router')
      router.transitionTo({queryParams: {sort}})
    }
  }
})
