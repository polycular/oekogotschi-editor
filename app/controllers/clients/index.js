import Ember from 'ember'

export default Ember.Controller.extend({
  queryParameters: ['page'],
  page: 1,
  size: 15,

  modalModel: null,
  openCreateClientModal: false,
  openDestroyClientModal: false,

  actions: {

    goto(page) {
      this.set('page', page)
    },

    openModal(modal, model) {
      this.set(modal, true)
      this.set('modalModel', model)
    },

    toggleModal(modal) {
      this.set(modal, !modal)
    },

    createClient(modal, model) {
      this.set(modal, false)

      this.store
        .createRecord('client', {
          name: model.get('name'),
          creator: this.get('currentUser').get('content')
        })
        .save()
    },

    destroyClient(modal) {
      this.set(modal, false)
      const model = this.get('modalModel')
      this.set('modalModel', null)
      model.destroyRecord()
    }
  }

})
