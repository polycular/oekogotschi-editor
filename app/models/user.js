import DS from 'ember-data'

export default DS.Model.extend({
  name: DS.attr('string'),
  password: DS.attr('string'),
  email: DS.attr('string'),
  gender: DS.attr('string'),
  birthday: DS.attr('date'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  campaigns: DS.hasMany('campaign'),
  clients: DS.hasMany('client', {inverse: 'editors'}),
  role: DS.belongsTo('role'),

  displayName: function() {
    return this.get('name') || this.get('email') || this.get('id')
  }.property('name', 'email')
})
