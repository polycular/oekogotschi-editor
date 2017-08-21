import Ember from 'ember'
import config from '../config/environment'

export function api() {
  return `${config.API.baseURL}/${config.API.namespace}`
}

export default Ember.Helper.helper(api)
