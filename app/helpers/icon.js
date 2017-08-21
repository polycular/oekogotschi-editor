import Ember from 'ember';

const dict = {
  'Action': 'fa fa-flash',
  'Default': 'fa fa-map-marker',
  'Game': 'fa fa-gamepad',
  'Text': 'fa fa-comment-o',
  'Tutorial': 'fa fa-magic',
  'Form': 'fa fa-envelope-o',
  'alpha-asc': 'fa fa-sort-alpha-asc',
  'alpha-desc': 'fa fa-sort-alpha-desc',
  'numeric-asc': 'fa fa-sort-numeric-asc',
  'numeric-desc': 'fa fa-sort-numeric-desc',
  'amount-asc': 'fa fa-sort-amount-asc',
  'amount-desc': 'fa fa-sort-amount-desc'
}

export function icon(params) {
  const [name, direction] = params
  const iconName = direction ? `${name}-${direction}` : name

  if (dict.hasOwnProperty(iconName)) {
    return dict[iconName]
  }
  return 'fa fa-question'
}

export default Ember.Helper.helper(icon);
