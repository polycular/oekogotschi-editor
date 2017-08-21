import DS from 'ember-data'

export default DS.Model.extend({
  name: DS.attr('string'),
  start: DS.attr('date'),
  end: DS.attr('date'),
  state: DS.attr('string', {defaultValue: 'draft'}),
  updatedAt: DS.attr('date'),
  createdAt: DS.attr('date'),
  nodes: DS.hasMany('node'),
  first: DS.belongsTo('node'),
  owner: DS.belongsTo('user'),
  project: DS.belongsTo('project'),
  longitude: DS.attr('number'),
  latitude: DS.attr('number'),
  description: DS.attr('string'),
  duration: DS.attr('number'),
  length: DS.attr('number'),
  logo: DS.belongsTo('file'),
  gpx: DS.belongsTo('file'),
  language: DS.attr('string')
})
