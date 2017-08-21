import Ember from 'ember'
import DS from 'ember-data'

export default Ember.Component.extend({
  gMap: Ember.inject.service(),

  tagName: 'fieldset',
  classNames: ['content-group'],

  zoom: 17,

  address: function() {
    return DS.PromiseObject.create({
      promise: this.get('gMap')
        .geocode({
          lat: this.get('data.latitude'),
          lng: this.get('data.longitude')
        })
        .then(geocodes => {
          if (geocodes.length > 0) {
            return geocodes[0].formatted_address
          }
          return ''
        })
    })
  }.property('data.latitude', 'data.longitude'),

  name: function() {
    return `${this.elementId}-map`
  }.property(),

  lat: function() {
    return this.get('data.latitude')
  }.property('data.latitude'),

  lng: function() {
    return this.get('data.longitude')
  }.property('data.longitude'),

  markers: function() {
    return Ember.A([
      {
        id: `${this.elementId}-marker`,
        lat: this.get('data.latitude'),
        lng: this.get('data.longitude'),
        draggable: true,
        dragend: (evt, marker) => {
          this.set('data.latitude', marker.position.lat())
          this.set('data.longitude', marker.position.lng())
        }
      }
    ])
  }.property('data.latitude', 'data.longitude'),

  circles: function() {
    return Ember.A([
      {
        id: `${this.elementId}-geofence`,
        lat: this.get('data.latitude'),
        lng: this.get('data.longitude'),
        radius: parseInt(this.get('data.radius'))
      }
    ])
  }.property('data.latitude', 'data.longitude', 'data.radius'),

  showQR: false,

  actions: {
    didUpdatePlace(result) {
      this.set('data.latitude', result.lat)
      this.set('lat', this.get('data.latitude'))
      this.set('data.longitude', result.lng)
      this.set('lng', this.get('data.longitude'))
    },
    setPin(event) {
      this.set('data.latitude', event.latLng.lat())
      this.set('data.longitude', event.latLng.lng())
    },
    setLat(value) {
      Ember.run.cancel(this._debouncedItem)
      this._debouncedItem = Ember.run.later(this, () => {
        this.set('data.latitude', value)
        this.set('lat', this.get('data.latitude'))
      }, 1000)
    },
    setLng(value) {
      Ember.run.cancel(this._debouncedItem)
      this._debouncedItem = Ember.run.later(this, () => {
        this.set('data.longitude', value)
        this.set('lng', this.get('data.longitude'))
      }, 1000)
    },

    toggle_trigger_required() {
      this.set('data.triggerRequired', !this.get('data.triggerRequired'))
    },

    toggleQR(){
      this.toggleProperty('showQR')
    },
  },

  destroy() {
   this._super(...arguments);
   Ember.run.cancel(this._debouncedItem);
  }
})
