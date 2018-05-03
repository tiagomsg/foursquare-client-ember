import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('route:venues/explore', 'Unit | Route | venues/explore', {
  needs: ['service:venues-service',
          'service:foursquare-explore-adaptor']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test('contains queryParams binding to force the model to refresh', function(assert) {
  let route = this.subject();

  assert.equal(JSON.stringify(route.get('queryParams')), JSON.stringify({ near: { refreshModel: true }}), 'Validate queryParams binding');
});

test('has venuesService property', function(assert) {
  var route = this.subject();

  var venuesService = route.get('venuesService');

  assert.notEqual(venuesService, undefined, 'Validate venuesService property exists');
});

test('model - calls venuesService.exploreVenues with right parameters', function(assert) {
  var route = this.subject();
  var expectedParams = { expected: "parameters" };
  Ember.run(() => {
    route.set('venuesService', {
      exploreVenues(queryParams) {
        assert.equal(queryParams, expectedParams, 'Validate arguments');
        assert.ok(true, 'Called exploreVenues from venuesService');
        return Ember.RSVP.Promise.resolve();
      }
    });
  });

  route.model(expectedParams);

  assert.expect(2);
});
