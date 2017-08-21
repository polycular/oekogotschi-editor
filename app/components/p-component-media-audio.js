import Ember from 'ember'

export default Ember.Component.extend({
  tagName: 'fieldset',
  classNames: ['content-group'],
  store: Ember.inject.service(),

  actions: {
    setDirty() {
      this.sendAction('setDirty')
    },

    addFile(file, data) {
      const {id} = data.data
      this.send('addFileById', 'file', id)
    },

    addFileById(attribute, id) {
      this.get('store')
        .findRecord('file', id)
        .then(file => {
          const component = this.get('data')
          component.set(attribute, file)
          return component.save()
        })
        .catch(err => console.error(err))
    },

  }
})
