import Ember from 'ember'
import graph, {TYPE_LINKED_LIST} from '../../modules/graph'
import linkedList from '../../modules/linked-list'
import moment from 'npm:moment'
import {create as createComponent} from '../../modules/component'
import config from '../../config/environment'

const $ = Ember.$

let autoSaveTimer = 60000
let autoSave = false
let autoSaveInt

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  i18n: Ember.inject.service(),

  isSaving: false,
  openDestroyNodeModal: false,
  collapsedNode: null,
  showQR: false,

  lastSave: moment(),

  autoSave: Ember.computed({
    get() {
      return autoSave
    },
    set(key, value) {
      autoSave = value
      if (autoSaveInt) {
        clearInterval(autoSaveInt)
      }
      if (autoSave) {
        autoSaveInt = setInterval(() => this.send('save'), autoSaveTimer)
      }
      return autoSave
    }
  }),

  reportsDownloadUrl: function() {
    const endpoint = `${config.API.baseURL}/${config.API.namespace}/reports/campaigns`
    const id = this.get('model.campaign.id')
    return `${endpoint}/${id}.xls`
  }.property('model.campaign'),

  graph: function() {
    const g = graph(
      this.get('store'),
      this.get('model.campaign.nodes'),
      this.get('model.campaign.first')
    )

    if (g.type() === TYPE_LINKED_LIST) {
      return g.transform(TYPE_LINKED_LIST)
    }

    // fallback
    return linkedList(this.get('store'), this.get('model.campaign.nodes'))
  }.property('model.campaign',
    'model.campaign.first',
    'model.campaign.nodes.length'),

  isLinkedList: function() {
    const length = this.get('model.campaign.nodes.length')
    if (length === 0) { return true }

    const g = graph(
      this.get('store'),
      this.get('model.campaign.nodes'),
      this.get('model.campaign.first')
    )

    return g.type() === TYPE_LINKED_LIST
  }.property('model.campaign',
    'model.campaign.first',
    'model.campaign.nodes.length'),

  list: function() {
    return this.get('graph').toArray()
  }.property('graph'),

  actions: {

    openModal(modal, model = undefined) {
      this.set(modal, true)

      if (modal === 'openDestroyNodeModal') {
        this.set('nodeToDestroy', model)
      }
    },

    toggleModal(modal) {
      this.set(modal, !modal)
    },

    toggleAutoSave() {
      this.set('autoSave', !this.get('autoSave'))
    },

    // Check for dirty models and autosave all of them
    save() {
      if (this.get('isSaving')) return

      this.set('isSaving', true)

      const list = []
      const campaign = this.get('model.campaign')
      const graph = this.get('graph').toArray()
      graph.forEach(node => {
        if (node.get('hasDirtyAttributes')) {
          list.push(node)
        } else if (node.get('isNew')) {
          list.push(node)
        }
        const components = node.get('components')
        components.forEach(component => {
          if (component.get('hasDirtyAttributes')) {
            const medias = component.get('medias')
            medias.forEach(media => {
              if (media.get('hasDirtyAttributes')) {
                list.push(media)
              }
            })
            list.push(component)
          }
        })
      })

      list.push(campaign)
      Ember.RSVP
        .all(list.map(model => {
          if (!model.save) {
            model = model.get('content')
          }
          model.save()
          .then(() => {
            this.set('isSaving', false)
            this.set('lastSave', moment())
          })
          .catch(() => this.set('isSaving', false))
        }))
    },

    addEmptyNode(index = undefined) {
      if (this.get('isSaving')) return

      this.set('isSaving', true)
      const i18n = this.get('i18n')
      const graph = this.get('graph')
      const campaign = this.get('model.campaign')
      const node = this.store.createRecord('node', {
        name: i18n.t('New Node'),
        campaign
      })

      const length = graph.length()
      index = index ? index : length

      node
        .save()
        .then(() => {
          this.set('collapsedNode', node)
          setTimeout(function() {
            $('body').animate({
              scrollTop: $('#node-' + node.get('id')).offset().top - 50
            }, 300);
          }, 200)
          graph.add(node, index)
        })
        // change campaign.first if necessary
        .then(() => {
          if (length === 0) {
            campaign.set('first', node)
            campaign.save()
          }
        })
        .then(() => this.set('isSaving', false))
    },

    addComponent(node, type, template) {
      if (this.get('isSaving')) return

      this.set('isSaving', true)
      let orderId = 0
      node.get('components').forEach(component => {
        let currentOrderId = component.get('orderId')
        if (currentOrderId >= orderId) { orderId = currentOrderId + 1 }
      })

      if (!template) {
        this.get('store').createRecord(
          'component',
          {
            type: type,
            orderId: orderId,
            node
          }
        ).save()
        .then(() => this.set('isSaving', false))
      } else {
        // TODO - Refactor: Make use of modules/component.js
        const groups = this.get('model.componentGroups')
        template.components.map(component => {
          const defaults = Object.assign({}, component.defaults)

          // Special Case: group ids
          if (defaults.groupId) {
            const group = groups.findBy('id', defaults.groupId)
            if (group) {
              defaults.group = group
            }
            delete defaults.groupId
          }

          this.get('store').createRecord(
            'component',
            Object.assign(defaults, {
              type: component.type,
              orderId: orderId,
              node
            })
          ).save()
          .then(() => this.set('isSaving', false))
        })
      }
    },

    // Check if needed to add a node from Template ...
    addTemplateNode(type, index = undefined) {
      if (this.get('isSaving')) return

      this.set('isSaving', true)
      const i18n = this.get('i18n')
      const graph = this.get('graph')
      const campaign = this.get('model.campaign')
      const node = this.store.createRecord('node', {
        name: i18n.t('New Node') + ' ' + i18n.t(type),
        campaign
      })

      const length = graph.length()
      index = index ? index : length

      node
      // we need the node ID
        .save()
        .then(() => {
          this.set('collapsedNode', node)
          setTimeout(function() {
            $('body').animate({
              scrollTop: $('#node-' + node.get('id')).offset().top - 50
            }, 300);
          }, 200)
          graph.add(node, index)
        })
        // change campaign.first if necessary
        .then(() => {
          if (length === 0) {
            campaign.set('first', node)
            campaign.save()
          }
        })
        // components
        .then(() => {
          createComponent(
            this.store,
            node,
            this.get('model.templates'),
            this.get('model.componentGroups'),
            type
          )
        })
        .then(() => this.set('isSaving', false))
    },
    setCollapsedNode(node){
      if (this.get('collapsedNode') === node) {
        this.set('collapsedNode', null)
      }
      else {
        this.set('collapsedNode', node)
      }

      setTimeout(function() {
        $('body').animate({
          scrollTop: $('#node-' + node.get('id')).offset().top - 50
        }, 300)
      }, 200)
    },

    deleteNode(modal) {
      if (this.get('isSaving')) return

      this.set('isSaving', true)
      this.set(modal, false)

      const campaign = this.get('model.campaign')
      const graph = this.get('graph')
      const nodeId = this.get('nodeToDestroy')
      this.set('nodeToDestroy', undefined)
      const node = graph.get(nodeId)
      const idx = graph.indexOf(node)

      graph
        .remove(node)
        .then(node => node.destroyRecord())
        .then(() => {
          const length = graph.length()
          if (idx === 0 && length > 0) {
            campaign.set('first', graph.get(0))
            campaign.save()
          } else if (idx === 0) {
            campaign.set('first', null)
            campaign.save()
          }
        })
        .then(() => this.set('isSaving', false))
    },

    sortList(node, index) {
      const graph = this.get('graph')
      const campaign = this.get('model.campaign')
        graph
        .move(node, index)
        .then(() => {
            // update campaign.first
            campaign.set('first', this.get('list.firstObject')) // <- why list instead of graph?
            campaign.save()
              .then(() => this.set('isSaving', false))
        })
    },

    moveUp(node, index) {
      if (this.get('isSaving')) return

      this.set('isSaving', true)
      const graph = this.get('graph')
      const length = graph.length()
      index === 0
        ? index = length - 1
        : index -= 1
      this.send('sortList', node, index)
    },

    moveDown(node, index) {
      if (this.get('isSaving')) return

      this.set('isSaving', true)
      const graph = this.get('graph')
      const length = graph.length()
      index < length - 1
        ? index += 1
        : index = 0
      this.send('sortList', node, index)
    },
    toggleQR(){
      this.toggleProperty('showQR')
    },
    redirect(campaign){
      this.transitionToRoute('campaigns.edit', campaign.get('id'));
    }

  }
})
