import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('p-breadcrumb-sort', 'Integration | Component | p breadcrumb sort', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{p-breadcrumb-sort}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#p-breadcrumb-sort}}
      template block text
    {{/p-breadcrumb-sort}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
