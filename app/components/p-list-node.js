import Ember from 'ember'

export default Ember.Component.extend({
  tagName: 'li',

  didInsertElement() {
    // Necessary to sort nodes (draggable)
    const $this = this.$()
    $this.on('sort', (evt, ui) => {
      this.get('sort')(this.get('data'), ui.item.index())
    })
  }

})
