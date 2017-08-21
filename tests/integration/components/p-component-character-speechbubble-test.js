import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('p-component-character-speechbubble', 'Integration | Component | p component character speechbubble', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{p-component-character-speechbubble}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#p-component-character-speechbubble}}
      template block text
    {{/p-component-character-speechbubble}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
