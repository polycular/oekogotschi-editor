import Ember from 'ember'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'
import moment from 'npm:moment'
import ENV from '../../config/environment'

const baseUrl = ENV.API.baseURL + '/' + ENV.API.namespace

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  queryParams: {
    clientId: {
      refreshModel: true
    },
    sort: {}
  },

  model(params) {
    return Ember.RSVP.hash({
      project:  this.store.findRecord('project', params.project_id),
      projects: this.store.query('project', {client: this.get('session.currentClient.id'), page: { limit: 1000}}),
      numberOfActiveUsers: fetch(baseUrl + '/reports/number-of-active-users')
        .then(response => response.json())
        .then(data => {
          const day = ['Day'].concat(data.map(row => moment(row.day, 'DD-MM-YYYY').toDate()))
          const usr = ['Number of Active Users'].concat(data.map(row => row.usr))
          return [day, usr]
        })
    })
  },

  afterModel(model, transition) {
    this._super(transition)
    this.get('session').set('currentProject', model.project.id)
    this.get('session').set('currentClient', model.project.get('client'))
  }
})
