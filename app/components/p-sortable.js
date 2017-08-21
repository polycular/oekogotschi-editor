import Ember from 'ember'

export default Ember.Component.extend({
  didInsertElement() {
    const $this = this.$()
    $this.sortable({
      axis: 'y',
      opacity: 1.0,
      helper: 'clone',
      cancel: '.ui-state-disabled',
      containment: $this.parent().parent()
    })
    $this.disableSelection()
    $this.on('sortupdate', (evt, ui) => ui.item.trigger('sort', [ui]))
  }
})
