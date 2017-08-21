import Ember from 'ember'
import Dropzone from 'npm:dropzone'

const previewTemplate = '<div class="dz-details"><img data-dz-thumbnail /></div>'

export default Ember.Component.extend({
  classNames: ['dropzone'],
  progress: 0,

  options: {
    maxFileSize: 1,
    acceptedFiles: 'image/*',

    previewTemplate: previewTemplate
  },

  didInsertElement() {
    const opts = Object.assign(this.get('options'), {
      url: this.get('url'),
      acceptedFiles: this.get('acceptedFiles'),
      clickable: `#${this.elementId} .upload-container`,
      previewsContainer: `#${this.elementId} .preview-container`
    })
    const upload = new Dropzone(this.get('element'), opts)
    upload.on('addedfile', () => {
      this.$()
        .find('.preview-container')
        .children()
        .remove()
    })
    upload.on('success', (file, data) => {
      this.get('success')(file, data)
    })
  }
})
