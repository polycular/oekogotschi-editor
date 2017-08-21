import Ember from 'ember'
import moment from 'npm:moment'
import 'npm:moment/locale/de'

export function formatDate(params, hash) {
  const date = params.length === 1 ? moment(params[0]) : moment()
  const format = hash.format ? hash.format : 'YYYY-MM-DDTHH:mm:ssZ'
  return moment(date).format(format)
}

export default Ember.Helper.helper(formatDate)
