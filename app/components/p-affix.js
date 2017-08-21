import Ember from 'ember'

export default Ember.Component.extend({

  top: undefined,
  bottom: undefined,

  didInsertElement() {
    Ember.$('body').addClass('has-detached-right')
  }

})
