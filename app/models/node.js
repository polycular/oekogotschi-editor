import DS from 'ember-data'

export default DS.Model.extend({
  name: DS.attr('string'),
  updatedAt: DS.attr('date'),
  createdAt: DS.attr('date'),
  campaign: DS.belongsTo('campaign', {inverse: null}),
  components: DS.hasMany('component'),
  transitions: DS.hasMany('transition')
})
