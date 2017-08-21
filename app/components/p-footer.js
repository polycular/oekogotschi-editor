import Ember from 'ember'
import moment from 'moment'

export default Ember.Component.extend({
  classNames: ['footer'],
  currentYear: Ember.computed(function() {
    return moment().format('YYYY')
  })
})
