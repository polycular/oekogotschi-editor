import Ember from 'ember'

export default Ember.Component.extend({
  tagName: 'fieldset',
  classNames: ['content-group'],
  store: Ember.inject.service(),

  sortBy: ['sortId:asc'],
  medias: Ember.computed.sort('data.medias', 'sortBy'),

  mediaOptions: [
    {
      type: 'headline',
      name: 'Headline',
      icon: 'fa-header'
    },
    {
      type: 'text',
      name: 'Text',
      icon: 'fa-paragraph'
    },
    {
      type: 'image',
      name: 'Image',
      icon: 'fa-picture-o'
    },
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
    addMedia(component, type) {
      let sortId = 0
      component.get('medias').forEach(media => {
        const currentSortId = media.get('sortId')
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
    },
    move(item, direction) {
      const itemSortId = item.get('sortId')

      let match
      let subsequent = []

      this.data.get('medias').forEach(media => {
        const currentSortId = media.get('sortId')
        if (direction === 'down' && currentSortId > itemSortId) {
          match = true
          subsequent.push(currentSortId)
        }
        if (direction === 'up' && currentSortId < itemSortId) {
          match = true
          subsequent.push(currentSortId)
        }
      })

      if (match) {
        subsequent.sort(function(a, b) {
          if (direction === 'down') { return a - b }
          if (direction === 'up') { return b - a }
        })
        let media = this.data.get('medias').findBy('sortId', subsequent[0])
        if (direction === 'down') { media.set('sortId', subsequent[0] - 1) }
        if (direction === 'up') { media.set('sortId', subsequent[0] + 1) }
        media.save()
          .then(() => {
            item.set('sortId', subsequent[0])
            item.save()
        })
      }
    },
    remove(media) {
      media.deleteRecord()
      media.save()
    }
  }
})
