import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | capitalize', function (hooks) {
  setupRenderingTest(hooks);

  // TODO: Replace this with your real tests.
  test('it capitalizes each word', async function (assert) {
    this.set('title', 'the hypnoflip invasion');
    await render(hbs`{{capitalize this.title}}`);
    assert.dom(this.element).hasText('The Hypnoflip Invasion');
    this.set('title', 'THI');
    assert.dom(this.element).hasText('THI');
  });
});
