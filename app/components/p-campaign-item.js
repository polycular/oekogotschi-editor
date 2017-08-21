import Ember from 'ember'

export default Ember.Component.extend({
  i18n: Ember.inject.service(),

  classNameBindings: ['panelColor'],

  hasControls: false,

  panelColor: function() {
    const state = this.get('data.state')
    switch (state) {
      case 'draft':
        return 'border-left-primary'
      case 'pending':
        return 'border-left-primary'
      case 'published':
        return 'border-left-success'
      case 'private':
        return 'border-left-warning'
      case 'trash':
        return 'border-left-danger'
    }
  }.property('data.state'),

  mouseEnter() {
    this.set('hasControls', true)
  },

  mouseLeave() {
    this.set('hasControls', false)
  },

  actions: {
    copy() {
      this.sendAction('copy')
    },
    remove() {
      this.sendAction('remove')
    }
  }
})
