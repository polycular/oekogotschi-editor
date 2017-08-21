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

    toggleCorrectAnswer(index) {
      const data = this.get('data')
      const correct = data.get('correct')

      if (correct.includes(index)) {
        correct.removeObject(index)
      } else {
        correct.pushObject(index)
      }

      data.save()
    },

    addAnswer() {
      const data = this.get('data')
      data.get('answers').pushObject([{value: ''}])
      data.save()
    },

    removeAnswer(index) {
      const data = this.get('data')
      data.get('answers').removeAt(index)
      data.save()
    }
  }
})
