import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:venues', 'Unit | Controller | venues');

test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('action - explore - calls exploreVenues', function(assert) {
  var controller = this.subject();
  controller.exploreVenues = function(place) {
    assert.equal(place, "test place", 'Validate transition parameters');
  };

  controller.send('explore', "test place");

  assert.expect(1);
});

test('exploreVenues - calls send', function(assert) {
  var controller = this.subject();
  controller.send = function(action, place) {
    assert.equal('exploreVenues', action, 'Validate correct action called');
    assert.equal(place, "test place", 'Validate correct contravention id');
  };

  controller.exploreVenues("test place");

  assert.expect(2);
});
