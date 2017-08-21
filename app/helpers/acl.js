import Ember from 'ember'
import acl from '../modules/acl'
import config from '../config/environment'

const $ = Ember.$

export default Ember.Helper.extend({

  defaultValue: null,

  allowed(acls, resource, role, privilege) {
    // invalid role -> DENY
    if (!acls.roles.hasOwnProperty(role)) {
      return false
    }
    const r = acls.roles[role]

    // wildcard lookup
    if (acls.resources.hasOwnProperty(acl.WILDCARD)) {
      const isAllowed = acl.isAllowed(acls.resources[acl.WILDCARD], r, privilege)
      if (isAllowed) {
        return true
      }
    }

    // direct lookup
    if (acls.resources.hasOwnProperty(resource)) {
      const isAllowed = acl.isAllowed(acls.resources[resource], r, privilege)
      if (isAllowed) {
        return true
      }
    }

    return false
  },

  compute([resource, role, privilege]) {
    if (this.value !== undefined) {
      return this.value
    }

    const url = `${config.API.baseURL}/${config.API.namespace}/acls.json`
    $
      .getJSON(url)
      .then(acls => {
        this.value = this.allowed(acls, resource, role, privilege)
        this.recompute()
      })

    return this.defaultValue
  }
})
