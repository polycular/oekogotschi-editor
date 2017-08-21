import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  queryParams: {
    page: {refreshModel: true},
    size: {refreshModel: true}
  },

  model(params) {
    const queryParams = {
      ['page[number]']: params.page,
      ['page[size]']: params.size
    }

    return this.store.query('template', queryParams)
  }
})
