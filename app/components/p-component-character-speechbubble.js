import Ember from 'ember'

export default Ember.Component.extend({
  tagName: 'fieldset',
  classNames: ['content-group'],

  actions: {
    setDirty() {
      this.data.set('hasDirtyAttributes', true)
    },

    setArray(a, index, value) {
      value = {value: value || ''}
      a.replace(index, 1, value)
      this.send('setDirty')
    },

    addSpeechbubblePair() {
      const data = this.get('data')
      data.get('headlines').pushObject({value: ''})
      data.get('texts').pushObject({value: ''})
      data.get('urls').pushObject({value: ''})
      data.save()
    },

    removeSpeechbubblePair(index) {
      const data = this.get('data')
      data.get('headlines').removeAt(index)
      data.get('texts').removeAt(index)
      data.get('urls').removeAt(index)
      data.save()
    }
  },

  didRender() {
    // check for existing text otherwise create empty
    if (this.data.get('texts.length') === 0) this.send('addSpeechbubblePair')
  }
})
