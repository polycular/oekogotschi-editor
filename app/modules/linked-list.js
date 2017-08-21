import Ember from 'ember'
import RSVP from 'rsvp'

const Promise = RSVP.Promise
const Logger = Ember.Logger

export default function(store, nodes) {

  function length() {
    return nodes.get('length')
  }

  function head() {
    return nodes.get('firstObject')
  }

  function tail() {
    return nodes.get('lastObject')
  }

  function indexOf(node) {
    return nodes.indexOf(node)
  }

  function get(node) {
    if (typeof node === 'number') {
      return nodes.objectAt(node)
    }

    if (typeof node === 'string') {
      return nodes.findBy('id', node)
    }

    const idx = nodes.indexOf(node)
    return nodes.objectAt(idx)
  }

  function toArray() {
    return Ember.A(nodes)
  }

  /*
   * Cases:
   *
   * -> node
   * -- node
   * -- node
   *
   * -- node
   * -> node
   * -- node
   *
   * -- node
   * -- node
   * -> node
   */
  function add(node, idx = undefined) {
    const save = []

    // create/update transition for node (if not last node)
    if (length() > idx) {
      const nextNode = get(idx)

      if (node.get('transitions.length') === 0) {
        const transition = store.createRecord('transition', {
          type: 'next',
          next: nextNode.get('id'),
          node: node
        })
        node.set('transitions', Ember.A([transition]))
        save.push(transition)
      } else {
        const transition = node.get('transitions.firstObject')
        transition.set('next', nextNode.get('id'))
        save.push(transition)
      }

      Logger.debug('create/update transition', node.get('name'), idx, node.get('name'), '->', nextNode.get('name'))
    }

    // if previous node is last node, add transition
    if (idx > 0 && idx - 1 === length() - 1) {
      const prevNode = get(idx - 1)
      const transition = store.createRecord('transition', {
        type: 'next',
        next: node.get('id'),
        node: prevNode
      })
      // TODO check if we just use `prevNode.set('transitions.firstObject', transition)` instead
      prevNode.set('transitions', Ember.A([transition]))
      save.push(transition)

      // delete transition (if exists) when inserted as last node
      const nodeTransition = node.get('transitions.firstObject')
      if (nodeTransition) {
        nodeTransition.deleteRecord()
        save.push(nodeTransition)

        Logger.debug('delete transition', node.get('name'), idx, node.get('name'))
      }

      Logger.debug('create transition', node.get('name'), idx, prevNode.get('name'), '->', node.get('name'))
    }

    // update previous node (if added node is not first node)
    if (idx > 0) {
      const prevNode = get(idx - 1)
      const transition = prevNode.get('transitions.firstObject')
      transition.set('next', node.get('id'))
      save.push(transition)

      Logger.debug('update transition', node.get('name'), idx, prevNode.get('name'), '->', node.get('name'))
    }

    if (typeof idx === 'number') {
      nodes.insertAt(idx, node)
    } else {
      nodes.pushObject(node)
    }

    // run save
    return Promise.all(
      save
        .uniq()
        .invoke('save')
    )
  }

  /*
   * Cases:
   *
   * <- node
   * -- node
   * -> node
   *
   * -> node
   * -- node
   * <- node
   *
   * <- node
   * -- node
   * -> node
   * -- node
   *
   * -- node
   * -> node
   * -- node
   * <- node
   *
   * -- node
   * <- node
   * -- node
   * -> node
   */
  function move(node, idx) {
    // nothing to do (fastlane)
    const prevIdx = indexOf(node)
    if (idx === prevIdx) {
      return Promise.resolve(false)
    }

    return remove(node).then(node => add(node, idx))
  }

  /*
   * Cases: Has three cases
   *
   * <- node
   * -- node
   *
   * -- node
   * <- node
   *
   * -- node
   * <- node
   * -- node
   */
  function remove(node) {
    const idx = nodes.indexOf(node)
    const save = []

    // if node was not first and not last, update previous node transition
    if (idx > 0 && length() > idx + 1) {
      const prevNode = get(idx - 1)
      const nextNode = get(idx + 1)
      const transition = prevNode.get('transitions.firstObject')
      transition.set('next', nextNode.get('id'))
      save.push(transition)

      Logger.debug('update transition', node.get('name'), idx, prevNode.get('name'), '->', nextNode.get('name'))
    }

    // if node was not first but last, remove previous node transition
    if (idx > 0 && length() === idx + 1) {
      const prevNode = get(idx - 1)
      const transition = prevNode.get('transitions.firstObject')
      transition.deleteRecord()
      save.push(transition)

      Logger.debug('delete transition', node.get('name'), idx, prevNode.get('name'))
    }

    nodes.removeObject(node)

    return Promise
      .all(
        save
          .uniq()
          .invoke('save')
      )
      .then(() => node)
  }

  return Object.freeze({
    length,
    head,
    tail,
    indexOf,
    get,
    add,
    move,
    remove,
    toArray
  })

}
