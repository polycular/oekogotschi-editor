import Ember from 'ember'

export default Ember.Component.extend({
  tagName: 'fieldset',
  classNames: ['content-group'],

  actions: {
    setDirty() {
      this.sendAction('setDirty')
    }
  }
})
