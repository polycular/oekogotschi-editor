import DS from 'ember-data'

export default DS.Model.extend({
  type: DS.attr('string'),
  name: DS.attr('string'),
  active: DS.attr('boolean'),
  definition: DS.attr('json'),
  orderId: DS.attr('number'),
  updatedAt: DS.attr('date'),
  createdAt: DS.attr('date')
})
