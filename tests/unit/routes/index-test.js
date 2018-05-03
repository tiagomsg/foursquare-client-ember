import { moduleFor, test } from 'ember-qunit';

moduleFor('route:index', 'Unit | Route | index');

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test('beforeModel - calls transitionTo venues', function(assert) {
  var route = this.subject();

  route.set('transitionTo', function(route) {
    assert.equal(route, 'venues', 'Validate transition to expected route');
  });

  route.beforeModel();

  assert.expect(1);
});
