import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

var validQuery = { near: "test place" };

moduleFor('service:venues-service', 'Unit | Service | venues service', {
  needs: ['service:foursquare-explore-adaptor']
});

test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('has exploreService property', function(assert) {
  var venuesService = this.subject();

  var exploreService = venuesService.get('exploreService');

  assert.notEqual(exploreService, undefined, 'Validate exploreService property exists');
});

test('exploreVenues - if called with no query parameters throw error', function(assert) {
  var venuesService = this.subject();

  var explore = function() { venuesService.exploreVenues(); };

  assert.throws(explore, Ember.Error, 'Validate instance of Ember.Error');
  assert.throws(explore, new Ember.Error('Near value not provided.'), 'Validate error message');
});

test('exploreVenues - if called with no near property throw error', function(assert) {
  var venuesService = this.subject();

  var explore = function() { venuesService.exploreVenues({}); };

  assert.throws(explore, Ember.Error, 'Validate instance of Ember.Error');
  assert.throws(explore, new Ember.Error('Near value not provided.'), 'Validate error message');
});

test('exploreVenues - calls exploreService.exploreVenues method with right parameters', function(assert) {
  var venuesService = this.subject();
  Ember.run(() => {
    venuesService.set('exploreService', {
      exploreVenues(queryParams) {
        assert.equal(queryParams, validQuery, 'Validate arguments');
        assert.ok(true, 'Called exploreVenues from exploreService');
        return Ember.RSVP.Promise.resolve();
      }
    });
  });

  venuesService.exploreVenues(validQuery);

  assert.expect(2);
});


test('exploreVenues - returns exploreService.exploreVenues', function(assert) {
  var venuesService = this.subject();
  var expectedResult = {expected: "result"};
  Ember.run(() => {
    venuesService.set('exploreService', {
      exploreVenues() {
        return expectedResult;
      }
    });
  });

  var result = venuesService.exploreVenues(validQuery);

  assert.equal(result, expectedResult, 'Validate expected result');
});
