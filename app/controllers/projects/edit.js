import Ember from 'ember'

/* global Promise: true */
export default Ember.Controller.extend({
  store: Ember.inject.service(),

  openCreateCampaignModal: false,
  openDestroyProjectModal: false,
  openDestroyCampaignModal: false,

  isSaving: false,

  queryParams: ['sort'],
  sort: 'createdAt:desc',

  campaigns: Ember.computed.sort('model.project.campaigns', 'sortDefinition'),
  sortDefinition: Ember.computed('sort', function() {
    return [this.get('sort')]
  }),

  actions: {
    sort(attribute) {
      this.set('sortBy', attribute)
    },
    openModal(modal, model) {
      this.set(modal, true)
      this.set('modalModel', model)
    },
    toggleModal(modal) {
      this.set(modal, !modal)
    },
    createCampaign(modal, model) {
      let campaign = this.store.createRecord('campaign', {
        name: model.get('name'),
        description: model.get('description'),
        project: this.get('model.project'),
        owner: this.get('currentUser').get('content')
      })

      campaign.save()
        .then(() => {
          model.set('name', '')
          model.set('description', '')
          this.set('savingError', false)
          this.set(modal, false)
        })
        .catch(err => {
          console.error(err)
          this.set('savingError', true)
          campaign.destroyRecord()
        })
    },
    campaignDuplication(campaign) {

      // Definitions
      const set_ID_mapping = (origin_ID, copy_ID) => {
        let mapping = []
        mapping.origin = origin_ID
        mapping.copy = copy_ID
        return mapping
      }

      const copy_campaign = async campaign => {
        this.set('isSaving', true)
        let campaign_copy = this.get('store').createRecord('campaign', campaign.toJSON())

        campaign_copy.set('name', `${campaign.get('name')} (Copy)`)
        campaign_copy.set('state', 'draft')

        campaign_copy.set('owner', campaign.get('owner'))
        campaign_copy.set('project', campaign.get('project'))
        campaign_copy.set('logo', campaign.get('logo'))
        campaign_copy.set('gpx', campaign.get('gpx'))
        return await campaign_copy.save()
        .catch(error => {
          console.error(error)
          this.set('campaignCopyError', true)
          this.set('isSaving', false)
        })
      }

      const copy_nodes = (nodes, campaign_copy) => {
        // set empty ID mapping
        let ID_mapping
        // copy Nodes
        return Promise.all(nodes.map(node => {
          let node_copy = this.get('store').createRecord('node', node.toJSON())
          node_copy.set('campaign', campaign_copy)
          return node_copy.save()
          .then(node_copy => {
            // update ID mapping
            ID_mapping = set_ID_mapping(node.id, node_copy.id)
            return {
              node: node_copy,
              ID_mapping: ID_mapping
            }
          })
          .catch(error => {
            console.error(error)
            this.set('campaignCopyError', true)
            this.set('isSaving', false)
          })
        }))
      }

      const process_nodes = (nodes_copy) => {
        nodes_copy.map(node_copy => {
          this.get('store').findRecord('node', node_copy.ID_mapping.origin)
          .then(node_origin => {
            // transitions
            node_origin.get('transitions').then(transitions => {
              transitions.map(transition => {
                const ID_match = nodes_copy.filter(node => {
                  if (node.ID_mapping.origin === transition.toJSON().next.target) return node
                })
                if (ID_match && ID_match.length > 0) {
                  // copy Transition
                  let newTransition = this.get('store').createRecord('transition', transition.toJSON())
                  newTransition.set('node', node_copy.node)
                  newTransition.set('next', ID_match[0].ID_mapping.copy)
                  newTransition.save()
                  .catch(error => {
                    console.error(error)
                    this.set('campaignCopyError', true)
                    this.set('isSaving', false)
                  })
                }
              })
            })

            // copy Components
            node_origin.get('components').then(components => {
              components.forEach(component => {
                let component_copy = this.get('store').createRecord('component', component.toJSON())
                component_copy.set('node', node_copy.node)
                // set Component Group
                component.get('group').then(group => {
                  if (group) component_copy.set('group', group)
                })

                component_copy.save().then(component_copy => {
                  // copy Component Medias
                  component.get('medias').then(medias => {
                    medias.forEach(media => {
                      let media_copy = this.get('store').createRecord('media', media.toJSON())
                      media_copy.set('component', component_copy)
                      media_copy.set('file', media.get('file'))
                      media_copy.save()
                      .catch(error => {
                        console.error(error)
                        this.set('campaignCopyError', true)
                        this.set('isSaving', false)
                      })
                    })
                  })
                })
                .catch(error => {
                  console.error(error)
                  this.set('campaignCopyError', true)
                  this.set('isSaving', false)
                })

              })
            })

          })
        })
      }

      const set_first = (campaign, campaign_copy, nodes_copy) => {
        campaign.get('first').then(first => {
          const ID_match_first = nodes_copy.filter(node => {
            if (node.ID_mapping.origin === first.id) return node
          })
          if (ID_match_first && ID_match_first.length > 0) {
            this.get('store').findRecord('node', ID_match_first[0].ID_mapping.copy).then(first => {
              campaign_copy.set('first', first)
              campaign_copy.save()
              .catch(error => {
                console.error(error)
                this.set('campaignCopyError', true)
                this.set('isSaving', false)
              })
            })
          }
        })
        this.set('isSaving', false)
      }

      // Processing
      copy_campaign(campaign)
      .then(campaign_copy => campaign.get('nodes')
        .then(nodes => copy_nodes(nodes, campaign_copy)
          .then(nodes_copy => {
            process_nodes(nodes_copy)
            set_first(campaign, campaign_copy, nodes_copy)
          })
        )
      )
    },
    deleteCampaign(modal) {
      this.set(modal, false)
      const model = this.get('modalModel')
      this.set('modalModel', null)
      model.destroyRecord()
    },

    addProjectImage(file, data) {
      const {id} = data.data
      this.store
          .findRecord('file', id)
          .then(file => {
            const project = this.get('model.project')
            project.set('image', file)
            return project.save()
          })
          .catch(err => console.error(err))
    },
    saveProject() {
      this.set('isSaving', true)
      const project = this.get('model.project')
      project
        .save()
        .then(() => this.set('isSaving', false))
        .catch(() => this.set('isSaving', false))
    },
    deleteProject(modal) {
      this.set(modal, false)

      const project = this.get('model.project')
      project
        .destroyRecord()
        .then(() => this.transitionToRoute('projects.index'))
    },
    redirect(project){
      this.transitionToRoute('projects.edit', project.get('id'));
    }
  }
})
