import Ember from 'ember'

const Logger = Ember.Logger

export default Ember.Controller.extend({

  definition: Ember.computed('model.definition', {
    get() {
      const definition = this.get('model.definition')
      try {
        return JSON.stringify(definition, null, '  ')
      } catch (err) {
        Logger.error(err)
        return ''
      }
    },
    set(key, value) {
      try {
        const definition = JSON.parse(value)
        this.set('model.definition', definition)
      } catch (err) {
        Logger.error(err)
      }
      return value
    }

  }),

  actions: {
    toggleActive() {
      const active = this.get('model.active')
      this.set('model.active', !active)
    },

    save() {
      const template = this.get('model')
      template.save()
    }
  }

})
