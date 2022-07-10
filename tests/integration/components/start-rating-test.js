import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | start-rating', function (hooks) {
  setupRenderingTest(hooks);

  test('Calls onUpdate with the correct value', async function (assert) {
    this.set('rating', 2);
    this.set('updateRating', (rating) => {
      assert.step(`Updated to rating: ${rating}`);
    });
    await render(hbs`
    <StarRating
    @rating={{this.rating}}
    @onUpdate={{this.updateRating}}
    />
    `);
    await click('[data-test-rr="star-rating-button"]:nth-child(4)');
    assert.verifySteps(['Updated to rating: 4']);
  });
});
