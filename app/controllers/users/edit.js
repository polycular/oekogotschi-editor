import Ember from 'ember'
import moment from 'moment'

export default Ember.Controller.extend({

  gender: function() {
    return Ember.A([
      'female',
      'male',
      'neuter'
    ])
  }.property('model.gender'),

  days: function() {
    const days = new Array(31).fill(null).map((day, index) => index + 1)
    return Ember.A(days)
  }.property(),

  months: function() {
    return Ember.A(moment.months())
  }.property(),

  years: function() {
    const now = moment()
    const year = now.year()
    const years = new Array(100 - 18).fill(null).map((y, index) => year - 18 - index)
    return Ember.A(years)
  }.property(),

  day: Ember.computed('model.birthday', {
    get() {
      const birthday = moment(this.get('model.birthday'))
      return birthday.day()
    },
    set(key, value) {
      const birthday = moment(this.get('model.birthday'))
      birthday.day(value)
      this.set('model.birthday', birthday.toISOString())
      return value
    }
  }),

  month: Ember.computed('model.birthday', {
    get() {
      const birthday = moment(this.get('model.birthday'))
      return this.get('months').objectAt(birthday.month())
    },
    set(key, value) {
      const birthday = moment(this.get('model.birthday'))
      birthday.month(value)
      this.set('model.birthday', birthday.toISOString())
      return value
    }
  }),

  year: Ember.computed('model.birthday', {
    get() {
      const birthday = moment(this.get('model.birthday'))
      return birthday.year()
    },
    set(key, value) {
      const birthday = moment(this.get('model.birthday'))
      birthday.year(value)
      this.set('model.birthday', birthday.toISOString())
      return value
    }
  }),

  actions: {
    save() {
      const user = this.get('model')
      return user.save()
    }
  }

})
