import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  creator: DS.belongsTo('user'),
  client: DS.belongsTo('client'),
  image: DS.belongsTo('file'),
  campaigns: DS.hasMany('campaign')
})
