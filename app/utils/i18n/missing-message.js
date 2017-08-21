export default function(locale, key, context) {
  var values = Object.keys(context).map(function(key) {
    return context[key]
  })
  return 'Missing translation: ' + key + (values.length ? ': ' + (values.join(', ')) : '')
}
