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
      type: 'image',
      name: 'Image',
      icon: 'fa-picture-o'
    }
  ],

  actions: {
    setDirty() {
      this.data.set('hasDirtyAttributes', true)
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

    if (this.data.get('medias.length') >= 1) this.set('hasMedia', true)
  }
})
