import Ember from 'ember'

export default Ember.Component.extend({
  classNames: ['navbar', 'navbar-default', 'header-highlight'],

  didInsertElement() {
    // Disabled links
    this.$('.navbar-nav .disabled a')
      .on('click', function(e) {
        e.preventDefault()
        e.stopPropagation()
      })
  }
})
