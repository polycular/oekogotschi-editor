import RSVP from 'rsvp'

const Promise = RSVP.Promise

function getTemplate(templates, name) {
  const template = templates.findBy('name', name)
  return template ? template : false
}

export function create(store, node, templates, groups, name) {
  const template = getTemplate(templates, name)

  if (!template) {
    return Promise.reject(new Error(`Invalid template: "${name}"`))
  }

  const definition = template.get('definition')

  const components = definition.components.map(component => {
    const defaults = Object.assign({}, component.defaults)

    // Special Case: group ids
    if (defaults.groupId) {
      const group = groups.findBy('id', defaults.groupId)
      if (group) {
        defaults.group = group
      }
      delete defaults.groupId
    }

    return store
      .createRecord(
        'component',
        Object.assign(defaults, {
          type: component.type,
          node
        })
      )
      .save()
  })

  return Promise.all(components)
}
