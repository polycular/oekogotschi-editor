import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('p-component-multiquiz', 'Integration | Component | p component multiquiz', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{p-component-multiquiz}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#p-component-multiquiz}}
      template block text
    {{/p-component-multiquiz}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
