import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('p-campaign-item', 'Integration | Component | p campaign item', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{p-campaign-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#p-campaign-item}}
      template block text
    {{/p-campaign-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
