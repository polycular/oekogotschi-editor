import Ember from 'ember'

export default Ember.Component.extend({
  tagName: 'fieldset',
  classNames: ['content-group'],
  store: Ember.inject.service(),

  actions: {
    setDirty() {
      this.sendAction('setDirty')
    },

    addImage(file, data) {
      const {id} = data.data
      this.get('store')
        .findRecord('file', id)
        .then(file => {
          const component = this.get('data')
          component.set('file', file)
          return component.save()
        })
        .catch(err => console.error(err))
    }
  }
})
