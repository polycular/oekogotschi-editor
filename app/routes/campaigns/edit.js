import Ember from 'ember'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  model(params) {
    const campaign = this.store.findRecord(
      'campaign',
      params.campaign_id,
      {include: 'nodes.components.group,nodes.transitions,nodes.components.image,nodes.components.medias.file'}
    )
    return Ember.RSVP.hash({
      campaign,
      projects: this.store.query('project', {page: {limit: 1000}}),
      templates: this.store.query('template', {filter: 'active EQ true', sort: 'orderId'}),
      componentGroups: this.store.findAll('component-group')
    })
  }

})
