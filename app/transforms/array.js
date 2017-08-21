import Ember from 'ember'
import Transform from 'ember-data/transform'

export default Transform.extend({
  deserialize: function(value) {
    if (value && value.length > 0) value = JSON.parse(value)
    if (Ember.isArray(value)) {
      value = value.map(value => typeof value === 'string' ? {value} : value)
      return Ember.A(value)
    } else return Ember.A()
  },

  serialize: function(value) {
    if (Ember.isArray(value)) {
      value = value.map(value => {
        if (typeof value === 'object' && value.hasOwnProperty('value')) return value.value
        else return value
      })
      return Ember.A(JSON.stringify(value))
    } else if (value && typeof value === 'string') return Ember.A(value)
    else return Ember.A()
  }
})
