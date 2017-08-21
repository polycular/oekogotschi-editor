import Ember from 'ember'

export function indexOf(params) {
  const array = params[0]
  if (!Array.isArray(array)) {
    return
  }
  const i = params[1] | 0
  if (i < array.length) {
    return array[i]
  }
}

export default Ember.Helper.helper(indexOf)
