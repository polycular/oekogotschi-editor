import Ember from 'ember'
import config from '../config/environment'

export function media(params, hash) {
  const [resourceId] = params
  const {width = 300} = hash
  const {height = 200} = hash
  const {action = 'resize'} = hash
  const {modifier = '@'} = hash
  const {extension = 'jpg'} = hash

  const query = `w=${width}&h=${height}&a=${action}&m=${modifier}`
  return `${config.API.baseURL}/${config.API.namespace}/media/${resourceId}.${extension}?${query}`
}

export default Ember.Helper.helper(media)
