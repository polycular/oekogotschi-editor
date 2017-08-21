import DS from 'ember-data'

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  isSuperuser: DS.attr('boolean'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  parent: DS.belongsTo('role', {
    async: true,
    inverse: null
  })

})
