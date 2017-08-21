import Ember from 'ember'

export default Ember.Component.extend({
  tagName: 'fieldset',
  classNames: ['content-group'],
  store: Ember.inject.service(),

  sortBy: ['sortId:asc'],
  medias: Ember.computed.sort('data.medias', 'sortBy'),
  hasMedia: false,

  mediaOptions: [
    {
      type: 'audio',
      name: 'Audio',
      icon: 'fa-file-audio-o'
    }
  ],

  actions: {
    setDirty() {
      this.data.set('hasDirtyAttributes', true)
    },

    setArray(a, index, value) {
      value = {value: value || ''}
      a.replace(index, 1, value)
      this.send('setDirty')
    },

    addText() {
      const data = this.get('data')
      data.get('headlines').pushObject({value: ''})
      data.get('texts').pushObject({value: ''})
      data.save()
    },

    removeText(index) {
      const data = this.get('data')
      data.get('headlines').removeAt(index)
      data.get('texts').removeAt(index)
      data.save()
    },

    addMedia(component, type) {
      if (this.get('hasMedia')) return

      let sortId = 0
      component.get('medias').forEach(media => {
        let currentSortId = media.get('sortId')
        if (currentSortId >= sortId) { sortId = currentSortId + 1 }
      })

      let media = this.get('store').createRecord(
        'media',
        {
          type: type,
          sortId: sortId,
          component: component
        }
      )
      media.save()
        .then(() => this.set('hasMedia', true))
    },
    remove(media) {
      media.deleteRecord()
      media.save()
        .then(() => this.set('hasMedia', false))
    }
  },

  init() {
    this._super(...arguments)

    // check for media
    if (this.data.get('medias.length') >= 1) this.set('hasMedia', true)
  },

  didRender() {
    // check for existing text otherwise create empty
    if (this.data.get('texts.length') === 0) this.send('addText')
  }
})
