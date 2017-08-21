import DS from 'ember-data'

export default DS.Model.extend({
  type: DS.attr('string'),
  orderId: DS.attr('number'),

  // location
  latitude: DS.attr('number'),
  longitude: DS.attr('number'),
  radius: DS.attr('number'),
  triggerByPin: DS.attr('boolean'),
  triggerByQr: DS.attr('boolean'),
  triggerByBt: DS.attr('boolean'),
  triggerRequired: DS.attr('boolean'),

  // location, action
  pin: DS.attr('string'),

  // waypoint, riddle-cache, multiquiz, action
  points: DS.attr('number'),

  // riddle-cache
  hint: DS.attr('string'),

  // location-helper
  turnOnByDefault: DS.attr('boolean'),
  showTrack: DS.attr('boolean'),

  // location-riddle, location-helper, multiquiz
  penalty: DS.attr('number'),

  // waypoint, riddle-cache, intro
  text: DS.attr('string'),

  // waypoint, riddle-cache, multiquiz, action
  timer: DS.attr('number'),

  // tutorial, character-speechbubble
  headlines: DS.attr('array'),
  texts: DS.attr('array'),
  urls: DS.attr('array'),

  // multiquiz
  question: DS.attr('string'),
  answers: DS.attr('array'),
  correct: DS.attr('array'),

  // action
  additionalTime: DS.attr('number'),

  medias: DS.hasMany('media'),
  node: DS.belongsTo('node'),
  group: DS.belongsTo('component-group')
})
