import Ember from 'ember'

export function toFixed(params, opts) {
  opts = Object.assign({
    precision: 4
  }, opts)
  const factor = Math.pow(10, opts.precision)
  return Math.round(params[0] * factor) / factor
}

export default Ember.Helper.helper(toFixed)
