import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  queryParams: {
    page: {refreshModel: true},
    size: {refreshModel: true},
    filter: {refreshModel: true}
  },

  model(params) {
    const queryParams = {
      ['page[number]']: params.page,
      ['page[size]']: params.size
    }

    if (params.filter) {
      queryParams.filter = `name LK '%${params.filter}%' OR email LK '%${params.filter}%'`
    }

    return this.store.query('user', queryParams)
  }
})
