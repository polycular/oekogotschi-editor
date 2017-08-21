import Ember from 'ember'

const labels = {
  'location': {
    name: 'Location',
    icon: 'icon-location4',
    group_position: 0,
  },
  'waypoint': {
    name: 'Content',
    icon: 'fa fa-file-text',
    group_position: 1,
  },
  'location-riddle': {
    name: 'Content',
    icon: 'fa fa-file-text',
    group_position: 1,
  },
  'location-helper': {
    name: 'Options',
    icon: 'fa fa-compass',
    group_position: 3
  },
  'intro': {
    name: 'Intro',
    icon: 'fa fa-star-o'
  },
  'tutorial': {
    name: 'Tutorial',
    icon: 'fa fa-flag-o'
  },
  'character-speechbubble': {
    name: 'Speechbubble',
    icon: 'icon-bubble8'
  },
  'multiquiz': {
    name: 'Quiz',
    icon: 'icon-list'
  },
  'action': {
    name: 'Action',
    icon: 'fa fa-flash'
  },
  'game': {
    name: 'Game',
    icon: 'fa fa-gamepad'
  },
  'multimedia': {
    name: 'Multimedia',
    icon: 'fa fa-video-camera'
  }
}

const group_labels = {
  'waypoint': {
    name: 'Waypoint',
    icon: 'icon-location4',
  },
  'location-riddle': {
    name: 'Riddle Cache',
    icon: 'icon-location4',
  }
}

const get_label = type => {
  if (labels.hasOwnProperty(type))
    return labels[type]
}

const get_group_label = type => {
  if (group_labels.hasOwnProperty(type))
    return group_labels[type]
}

export default Ember.Component.extend({
  dirty: false,

  groups: function() {

    // Definitions
    const group_components_by_order_id = components => {
      return components.reduce((groups, component) => {
        const order = component.get('orderId')
        groups[order] = groups[order] || []
        groups[order].push(component)
        return groups
      }, {})
    }

    const sort_by_order = (a, b) => {
      return a.order - b.order
    }

    const has_multiple_components = components => {
      if (components.length > 1) return true
      return false
    }

    // STATE
    const data = this.get('data')

    // ACTION
    const grouped_components = group_components_by_order_id(data)

    let list = []
    Object.keys(grouped_components).sort(sort_by_order).forEach(key => {
      let label
      let group_label
      let components = []
      grouped_components[key].forEach(component => {
        label = get_label(component.get('type'))

        // create component object
        const component_object = {
          name: label.name || '',
          icon: label.icon || '',
          order: label.group_position || 0,
          element: component
        }
        components.push(component_object)

        // get type to determine if a special component is needed
        const type = component.get('type')

        // special trigger_tab for location
        if (type === 'location') {
          // create trigger component
          const trigger_object = {
            name: 'Trigger',
            icon: 'fa fa-check-circle-o',
            order: 2,
            trigger: true,
            element: component
          }
          components.push(trigger_object)

          // set group label
          group_label = get_group_label(type)
        }

        // special timer_tab for waypoint & location-riddle
        if (type === 'waypoint' || type === 'location-riddle') {
          // create timer component
          const timer_object = {
            name: 'Timer',
            icon: 'fa fa-clock-o',
            order: 5,
            timer: true,
            element: component
          }
          components.push(timer_object)

          // set group label
          group_label = get_group_label(type)
        }
      })

      if (group_label) label = group_label
      // create group object
      const group = {
        name: label.name || '',
        icon: label.icon || '',
        order: key,
        has_multiple_components: has_multiple_components(grouped_components[key]),
        components: components.sort(sort_by_order)
      }
      list.push(group)
    })

    // MODEL
    return list
  }.property('data.@each.group', 'data.@each.type'),

  actions: {
    move(key_element, direction) {

      // Definitions
      const get_subsequent_elements = (all_elements, key_element_position, direction) => {
        return all_elements.filter(element => {
          const element_position = element.order
          if (direction === 'down' && element_position > key_element_position) return element
          if (direction === 'up' && element_position < key_element_position) return element
          return 0
        })
      }

      const get_adjacent_element = (subsequent_elements, direction) => {
        if (direction === 'down') return subsequent_elements[0]
        if (direction === 'up') return [...subsequent_elements].pop()
        return 0
      }

      const process_key_element = (key_element, adjacent_element_position) => {
        // set order
        Ember.set(key_element, 'order', adjacent_element_position)
        // update components
        key_element.components.forEach(component => {
          component.element.set('order', adjacent_element_position)
          component.element.set('orderId', adjacent_element_position)
          component.element.save()
            .catch(error => console.error(error))
        })
      }

      const process_adjacent_element = (adjacent_element, direction) => {
        // set order
        let order = parseInt(adjacent_element.order)
        if (direction === 'down') order -= 1
        if (direction === 'up') order += 1
        // set new order back to adjacent element
        Ember.set(adjacent_element, 'order', order)
        // update components
        adjacent_element.components.forEach(component => {
          component.element.set('order', adjacent_element.order)
          component.element.set('orderId', adjacent_element.order)
          component.element.save()
            .catch(error => console.error(error))
        })
      }

      // STATE
      const all_elements = this.get('groups')

      // ACTION
      const subsequent_elements = get_subsequent_elements(all_elements, key_element.order, direction)
      let adjacent_element = get_adjacent_element(subsequent_elements, direction)

      // MODEL
      if (adjacent_element) {
        process_key_element(key_element, adjacent_element.order)
        process_adjacent_element(adjacent_element, direction)
        this.notifyPropertyChange('groups')
      }
    },
    removeGroup(group) {
      // remove special 'Timer' component
      const components = group.components.filter(component => {
        return (component.name !== 'Trigger' && component.name !== 'Timer')
      })
      Ember.set(group, 'components', components)

      // destroy components
      group.components.forEach(component => {
        component.element.destroyRecord()
      })
    },
  },

  didUpdateAttrs() {
    this.set('dirty', true)
  },

  didUpdate() {
    if (this.get('dirty')) {
      // scroll last element into view
      this.get('element').lastElementChild.scrollIntoView()
      // TODO: Refacor
      // this is a "dirty" hack with a timeout of 1 second to wait until all renderers have completed
      setTimeout(() => { this.set('dirty', false) }, 1000)
    }
  }
})
