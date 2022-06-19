import { module, test } from 'qunit';
import { setupTest } from 'rarwe/tests/helpers';

module('Unit | Model | song', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('song', {});
    assert.ok(model);
  });
});
