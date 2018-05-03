import { moduleFor, test } from 'ember-qunit';

moduleFor('route:venues', 'Unit | Route | venues', {
    needs: ['service:venues-service',
            'service:foursquare-explore-adaptor']
});


test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test('action - exploreVenues - calls transition to with query parameters', function(assert) {
  var route = this.subject();
  var place = "test place";
  var expectedQueryParams = {
    queryParams: {
      near: place
    }
  };
  route.transitionTo = function(route, queryParams) {
    assert.equal(route, 'venues.explore', 'Validate transition to expected route');
    assert.equal(JSON.stringify(queryParams), JSON.stringify(expectedQueryParams), 'Validate transition parameters');
  };

  route.send('exploreVenues', place);

  assert.expect(2);
});
