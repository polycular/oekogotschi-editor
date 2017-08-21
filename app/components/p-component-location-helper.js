import Ember from 'ember'

export default Ember.Component.extend({
  tagName: 'fieldset',
  classNames: ['content-group'],

  actions: {
    toggleHelper() {
      this.set('data.turnOnByDefault', !this.get('data.turnOnByDefault'))
      if (this.get('data.turnOnByDefault')) this.set('data.penalty', 0)
    },
    toggleShowTrack() {
      this.set('data.showTrack', !this.get('data.showTrack'))
    }
  }
})
