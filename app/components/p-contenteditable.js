import Ember from 'ember'

export default Ember.Component.extend({
  classNames: ['ember-content-editable'],

  didInsertElement() {
    const $el = this.$()
    $el
      .attr('contenteditable', true)
      .attr('placeholder', this.get('placeholder') || '')
      .on('input', () => this.set('value', $el.text()))
  }
})
