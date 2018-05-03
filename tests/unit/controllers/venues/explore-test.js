import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:venues/explore', 'Unit | Controller | venues/explore');

test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('contains binding with near on the query params', function(assert) {
  let controller = this.subject();

  assert.equal(controller.get('queryParams').length, 1, 'Validate queryParams length');
  assert.equal(controller.get('queryParams').pop(), "near", 'Validate queryParams near');
});
