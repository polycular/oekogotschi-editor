import DS from 'ember-data'
import Ember from 'ember'

export default DS.Model.extend({
  name: DS.attr('string'),
  type: DS.attr('string'),
  checksum: DS.attr('string'),
  size: DS.attr('number'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  extension: Ember.computed('name', function() {
    return (this.get('name') || '').split('.').get('lastObject')
  })
})
