/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app')

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    codemirror: {
      modes: ['javascript'],
      keyMaps: ['sublime'],
      themes: ['xq-light']
    },
    lessOptions: {
      sourceMap: false,
      paths: [
        'bower_components'
      ]
    },
    'ember-bootstrap': {
      importBootstrapCSS: true,
      importBootstrapFont: false,
      'bootstrapVersion': 3
    }
  })

  app.import('vendor/jquery-ui.js')
  app.import('vendor/icomoon/fonts/icomoon.woff', {destDir: 'fonts'})

  app.import(app.bowerDirectory + '/font-awesome/fonts/fontawesome-webfont.woff2', {destDir: 'fonts'})
  app.import(app.bowerDirectory + '/font-awesome/fonts/fontawesome-webfont.woff', {destDir: 'fonts'})
  app.import(app.bowerDirectory + '/bootstrap-datepicker/js/locales/bootstrap-datepicker.de.js', {
    exports: { 'bootstrap-datepicker': ['default'] }
  })

  return app.toTree()
}
