import Ember from 'ember'
import JSONAPISerializer from 'ember-data/serializers/json-api';

export default JSONAPISerializer.extend({
  attrs: {
    next: 'data'
  },
  payloadKeyFromModelName(modelName) {
    return Ember.String.singularize(modelName)
  }
})
