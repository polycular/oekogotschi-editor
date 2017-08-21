import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('p-campaign-status-toggle', 'Integration | Component | p campaign status toggle', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{p-campaign-status-toggle}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#p-campaign-status-toggle}}
      template block text
    {{/p-campaign-status-toggle}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
