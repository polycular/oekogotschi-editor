import DS from 'ember-data'

export default DS.Model.extend({
  name: DS.attr('string'),
  createdAt: DS.attr('date'),

  creator: DS.belongsTo('user'),
  projects: DS.hasMany('project'),
  editors: DS.hasMany('user', {inverse: 'clients'})
})
