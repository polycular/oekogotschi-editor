import Ember from 'ember'

export default Ember.Component.extend({
  classNames: ['panel'],

  isCollapsible: true,

  title: '',
  collapsed: false,

  didInsertElement() {
    this._super(...arguments)
    this.$panelBody = this.$('.panel-body')
    if (this.get('collapsed')) {
      this.$panelBody.hide()
    } else {
      this.$panelBody.show()
    }
  },

  actions: {
    toggleCollapse() {
      this.toggleProperty('collapsed')
      this.$panelBody.slideToggle('fast')
    }
  }
})
