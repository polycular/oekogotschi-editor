import JSONAPISerializer from 'ember-data/serializers/json-api'
import Ember from 'ember'

export default JSONAPISerializer.extend({
  keyForAttribute(attr) {
    return attr
  },
  payloadKeyFromModelName(modelName) {
    return Ember.String.singularize(modelName)
  }
})
