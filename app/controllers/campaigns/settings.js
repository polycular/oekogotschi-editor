import Ember from 'ember'
import fileUpload from '../../modules/file_upload'

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  i18n: Ember.inject.service(),

  new_project: null,
  transfer_success: null,
  showQR: false,

  actions: {
    addCampaignLogo(file, data) {
      const {id} = data.data
      this.store
        .findRecord('file', id)
        .then(file => {
          const campaign = this.get('model.campaign')
          campaign.set('logo', file)
          return campaign.save()
        })
        .catch(err => console.error(err))
    },
    addGPX(event) {
      let file = event.target.files[0]
      fileUpload(file).then(file => {
        this.get('store').findRecord('file', file.data.id).then(file => {
          const campaign = this.get('model.campaign')
          campaign.set('gpx', file)
          campaign.save()
          }).catch(error => console.error(error))
      }).catch(error => console.error(error))
    },
    save() {
      this.set('isSaving', true)
      const client = this.get('model.campaign')
      client
        .save()
        .then(() => this.set('isSaving', false))
        .catch(() => this.set('isSaving', false))
    },
    toggleQR(){
      this.toggleProperty('showQR')
    },
    redirect(campaign){
      this.transitionToRoute('campaigns.settings', campaign.get('id'));
    },
    toggleState(state) {
      if (state) this.set('model.campaign.state', 'published')
      else this.set('model.campaign.state', 'draft')
    },
    setLanguage(language){
      this.set('model.campaign.language', language)
    },
    transfer_select(new_project) {
      this.set('new_project', new_project)
    },
    transfer_confirm() {
      if (this.get('new_project') && this.get('new_project').id !== this.get('model.campaign.project.content.id')) {
        this.set('isSaving', true)
        this.set('model.campaign.project', this.get('new_project'))
        const campaign = this.get('model.campaign')
        campaign.save()
          .then(() => {
            this.set('isSaving', false)
            this.set('transfer_success', true)
          })
          .catch(() => this.set('isSaving', false))
      }
    }
  }
})
