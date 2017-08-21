import Transform from 'ember-data/transform'

export default Transform.extend({
  deserialize(serialized) {
    return serialized.target
  },

  serialize(deserialized) {
    return {target: deserialized}
  }
})
