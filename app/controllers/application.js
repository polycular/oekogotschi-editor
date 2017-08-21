import Ember from 'ember'

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  hasSidebar: function() {
    return true
  }
})
