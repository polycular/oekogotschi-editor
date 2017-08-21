import DS from 'ember-data'

export default DS.Model.extend({
  type: DS.attr('string'),
  sortId: DS.attr('number'),

  name: DS.attr('string'),
  headline: DS.attr('string'),
  text: DS.attr('string'),

  file: DS.belongsTo('file'),

  component: DS.belongsTo('component')
})
