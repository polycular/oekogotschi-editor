import Ember from 'ember'

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),

  queryParams: ['sort'],

  openCreateProjectModal: false,

  projectsByClient: function() {
    const clientId = this.get('model.client.id')
    const projects = this.get('model.projects')
    return projects.filter(project => {
      if (!clientId) {
        return false
      }
      return project.get('client.id') === clientId
    })
  }.property('model.projects.@each.name', 'model.client'),

  sort: 'createdAt:desc',
  sortDefinition: Ember.computed('sort', function() {
    return [this.get('sort')]
  }),
  projects: Ember.computed.sort('projectsByClient', 'sortDefinition'),

  actions: {
    openModal(modal, model) {
      this.set(modal, true)
      this.set('modalModel', model)
    },
    toggleModal(modal) {
      this.set(modal, !modal)
    },
    createProject(modal, model) {
      this.set(modal, false)

      let project = this.store
          .createRecord('project', {
            name: model.get('name'),
            description: model.get('description'),
            creator: this.get('currentUser').get('content'),
            client: this.get('model.client')
          })

      project
        .save()
        .then(() => {
          this.get('model.projects').pushObject(project._internalModel);
          model.set('name', '');
          model.set('description', '');
        })
    },
    changeClient(client) {
      this.set('model.client', client)
      this.set('session.currentClient', client)
    }
  }
})
