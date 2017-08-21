import Ember from 'ember'

export function includes(params) {
  const array = params[0]
  const compare = params[1]
  if (!array) { return false }
  return array.includes(compare)
}

export default Ember.Helper.helper(includes)
