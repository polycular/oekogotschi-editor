import Ember from 'ember'
import linkedList from './linked-list'

const Logger = Ember.Logger

/* global Symbol: true */
export const TYPE_GRAPH = Symbol('graph')
export const TYPE_LINKED_LIST = Symbol('linked-list')

export default function(store, nodes = Ember.A(), first = undefined) {

  const map = nodes.reduce((map, node) => {
    map[node.get('id')] = node
    return map
  }, {})

  function next(node) {
    const transition = node.get('transitions.firstObject')
    if (!transition) {
      return false
    }

    const next = transition.get('next')
    if (!next) {
      return false
    }

    return map[next] ? map[next] : false
  }

  function type() {
    // is linked-list
    if (first && first.get('id')) {
      const length = nodes.get('length')
      const visited = []
      let current = first
      while (visited.length < length) {
        visited.push(current.get('id'))
        const nextNode = next(current)

        // no next
        if (!nextNode) {
          break;
        }

        const nextId = nextNode.get('id')

        // if visited.length === length but there is still a next one
        if (visited.length === length && nextId) {
          visited.push(null)
          Logger.debug('There is a "next" transition but all nodes have been visited. Cyclic dependency?')
          break;
        }

        // nextId can never be first
        if (nextId === first.get('id')) {
          break;
        }

        // next has already been visited
        if (visited.includes(nextId)) {
          break;
        }

        current = nextNode
      }

      if (visited.length === length) {
        return TYPE_LINKED_LIST
      }
    }

    return TYPE_GRAPH
  }

  function transform(exportType) {
    if (exportType === TYPE_LINKED_LIST) {
      if (type() !== exportType) {
        throw new Error(`Your tried to export as "${exportType.toString()}" but the current graph cannot be transformed.`)
      }

      const list = Ember.A()

      let current = first
      while (current) {
        list.pushObject(current)
        const transition = current.get('transitions.firstObject')
        if (transition) {
          current = map[transition.get('next')]
        } else {
          current = false
        }
      }

      return linkedList(store, list)
    }

    throw new Error(`Cannot export type: "${exportType.toString()}"`)
  }

  return Object.freeze({
    type,
    transform
  })

}
