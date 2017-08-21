import Transform from 'ember-data/transform'

export default Transform.extend({
  deserialize(serialized) {
    return JSON.parse(serialized)
  },

  serialize(deserialized) {
    return JSON.stringify(deserialized)
  }
})
