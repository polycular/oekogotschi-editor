import DS from 'ember-data'

export default DS.Model.extend({
  name: DS.attr('string'),
  definition: DS.attr('json')
})
