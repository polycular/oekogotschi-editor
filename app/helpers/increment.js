import Ember from 'ember'

export function increment(params, hash) {
  const {by = 1} = hash
  const [value] = params
  return value + by
}

export default Ember.Helper.helper(increment)
