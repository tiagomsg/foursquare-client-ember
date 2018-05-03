import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

var exploreResponse;
var itemToMap;
var groupToMap;
var responseToMap;
var errorResponse;

var validQuery = { near: "test place" };

moduleFor('service:foursquare-explore-adaptor', 'Unit | Service | foursquare explore adaptor', {
  needs: ['model:explore',
          'model:group',
          'model:venue'],
  beforeEach: function() {
    exploreResponse = {
      meta: {
        code: 200,
        requestId: "569bc8f8498ee273066c0989"
      },
      response: {
        geocode: {
          where: "soho",
          displayString: "Soho, Greater London, United Kingdom"
        },
        totalResults: 248,
        groups: [{
          type: "Recommended Places",
          name: "recommended",
          items: [{
            venue: {
              id: "4ac518cdf964a520e6a520e3",
              name: "National Gallery",
              contact: {
                phone: "+442077472885",
                formattedPhone: "+44 20 7747 2885",
                twitter: "nationalgallery",
                facebook: "83395535556",
                facebookUsername: "thenationalgallery",
                facebookName: "National Gallery"
              },
              location: {
                address: "Trafalgar Sq",
                lat: 51.50872242607024,
                lng: -0.1283276081085205,
                postalCode: "WC2N 5DN",
                cc: "GB",
                city: "Londres",
                state: "Greater London",
                country: "Reino Unido",
                formattedAddress: ["Trafalgar Sq", "Londres", "Greater London", "WC2N 5DN", "Reino Unido"]
              },
              stats: {
                checkinsCount: 37654,
                usersCount: 31698,
                tipCount: 362
              },
              url: "http:\/\/www.nationalgallery.org.uk",
              rating: 9.6
            }
          }, {
            venue: {
              id: "4ac518d2f964a5203da720e3",
              name: "British Museum",
              contact: {
                phone: "+442073238299",
                formattedPhone: "+44 20 7323 8299",
                twitter: "britishmuseum",
                facebook: "72228529722",
                facebookUsername: "britishmuseum",
                facebookName: "British Museum"
              },
              location: {
                address: "Great Russell St",
                lat: 51.519271779584045,
                lng: -0.1268470287322998,
                postalCode: "WC1B 3DG",
                cc: "GB",
                city: "Londres",
                state: "Greater London",
                country: "Reino Unido",
                formattedAddress: ["Great Russell St", "Londres", "Greater London", "WC1B 3DG", "Reino Unido"]
              },
              stats: {
                checkinsCount: 70645,
                usersCount: 57104,
                tipCount: 654
              },
              url: "http:\/\/britishmuseum.org",
              rating: 9.5
            }
          }]
        }, {
          type: "Popular Places",
          items: [{
            venue: {
              id: "2ac518d2f9w64a03qda720e0",
              name: "British Museum",
              contact: {
                phone: "+442073238299",
                formattedPhone: "+44 20 7323 8299",
                twitter: "britishmuseum",
                facebook: "72228529722",
                facebookUsername: "britishmuseum",
                facebookName: "British Museum"
              },
              location: {
                address: "Great Russell St",
                lat: 51.519271779584045,
                lng: -0.1268470287322998,
                postalCode: "WC1B 3DG",
                cc: "GB",
                city: "Londres",
                state: "Greater London",
                country: "Reino Unido",
                formattedAddress: ["Great Russell St", "Londres", "Greater London", "WC1B 3DG", "Reino Unido"]
              },
              stats: {
                checkinsCount: 70645,
                usersCount: 57104,
                tipCount: 654
              },
              url: "http:\/\/britishmuseum.org",
              rating: 9.5
            }
          }]
        }]
      }
    };
    errorResponse = {
      meta: {
        code: 400,
        errorType: "failed_geocode",
        errorDetail: "Couldn't geocode param near: asdeqfqef",
        requestId: "569e11ae498e4d8c8ccc0ca1"
      }
    };
    itemToMap = exploreResponse.response.groups[0].items[0];
    groupToMap = exploreResponse.response.groups[0];
    responseToMap = exploreResponse;
  }
});

test('it exists', function(assert) {
  let adaptor = this.subject();
  assert.ok(adaptor);
});

test('itemToVenueMap when no item is provided then throw error', function(assert) {
  let service = this.subject();

  var map = function() {
    service.itemToVenueMap();
  };

  assert.throws(map, Ember.Error, 'Validate instance of Ember.Error');
  assert.throws(map, new Ember.Error('Item not provided.'), 'Validate error message');
});

test('itemToVenueMap when item does not contain venue then throw error', function(assert) {
  let service = this.subject();
  delete itemToMap.venue;

  var map = function() {
    service.itemToVenueMap(itemToMap);
  };

  assert.throws(map, Ember.Error, 'Validate instance of Ember.Error');
  assert.throws(map, new Ember.Error('Item does not contain venue information.'), 'Validate error message');
});

test('itemToVenueMap when venue does not have an id then throw error', function(assert) {
  let service = this.subject();
  delete itemToMap.venue.id;

  var map = function() {
    service.itemToVenueMap(itemToMap);
  };

  assert.throws(map, Ember.Error, 'Validate instance of Ember.Error');
  assert.throws(map, new Ember.Error('Venue missing id property.'), 'Validate error message');
});

test('itemToVenueMap when venue does not have a name then throw error', function(assert) {
  let service = this.subject();
  delete itemToMap.venue.name;

  var map = function() {
    service.itemToVenueMap(itemToMap);
  };

  assert.throws(map, Ember.Error, 'Validate instance of Ember.Error');
  assert.throws(map, new Ember.Error('Venue missing name property.'), 'Validate error message');
});

test('itemToVenueMap returns a venue', function(assert) {
  let service = this.subject();

  var venue = service.itemToVenueMap(itemToMap);

  assert.equal(venue.get('id'), itemToMap.venue.id, 'Validate Id');
  assert.equal(venue.get('name'), itemToMap.venue.name, 'Validate name');
  assert.equal(venue.get('contact'), itemToMap.venue.contact, 'Valdate contact');
  assert.equal(venue.get('location'), itemToMap.venue.location, 'Validate location');
  assert.equal(venue.get('stats'), itemToMap.venue.stats, 'Validate stats');
  assert.equal(venue.get('url'), itemToMap.venue.url, 'Validate url');
  assert.equal(venue.get('rating'), itemToMap.venue.rating, 'Validate rating');
});


test('groupToGroupMap when group is not provided then throw error', function(assert) {
  let service = this.subject();

  var map = function() {
    service.groupToGroupMap();
  };

  assert.throws(map, Ember.Error, 'Validate instance of Ember.Error');
  assert.throws(map, new Ember.Error('Group not provided.'), 'Validate error message');
});

test('groupToGroupMap when group does not have a type then throw error', function(assert) {
  let service = this.subject();
  delete groupToMap.type;

  var map = function() {
    service.groupToGroupMap(groupToMap);
  };

  assert.throws(map, Ember.Error, 'Validate instance of Ember.Error');
  assert.throws(map, new Ember.Error('Group missing type property.'), 'Validate error message');
});

test('groupToGroupMap when there are no items then does not call itemToVenueMap', function(assert) {
  let service = this.subject();
  groupToMap.items = [];

  Ember.run(() => {
    service.set('itemToVenueMap', function() {
      assert.ok(false, 'Should not call itemToVenueMap');
      return {};
    });
  });
  service.groupToGroupMap(groupToMap);

  assert.expect(0);
});

test('groupToGroupMap when there are no items then returns a group without venues', function(assert) {
  let service = this.subject();
  groupToMap.items = [];

  var group = service.groupToGroupMap(groupToMap);

  assert.equal(group.get('venues').length, 0, 'Validate venues is empty');
  assert.equal(group.get('type'), groupToMap.type, 'Validate type is mapped');
});

test('groupToGroupMap when has 2 items then calls itemToVenueMap twice', function(assert) {
  let service = this.subject();
  var expectedItem1 = exploreResponse.response.groups[0].items[0];
  var expectedItem2 = exploreResponse.response.groups[0].items[1];

  Ember.run(() => {
    service.set('itemToVenueMap', function(item) {
      if(item.venue.id === expectedItem1.venue.id) {
        assert.equal(item, expectedItem1, 'Validate item argument1');
      }
      else {
        assert.equal(item, expectedItem2, 'Validate item argument2');
      }
      assert.ok(true, 'Called itemToVenueMap');
      return {};
    });
  });
  service.groupToGroupMap(groupToMap);

  assert.expect(4);
});

test('groupToGroupMap returns a group with venues', function(assert) {
  let service = this.subject();
  var expectedVenue = { id: "123"};
  Ember.run(() => {
    service.set('itemToVenueMap', function() {
      return expectedVenue;
    });
  });

  var group = service.groupToGroupMap(groupToMap);

  assert.equal(group.get('type'), groupToMap.type, 'Validate type');
  assert.equal(group.get('venues').length, 2, 'Validate venues');
  assert.equal(group.get('venues').pop(), expectedVenue, 'Validate venue returned');
});

test('responseToExploreMap when response is not provided then throw error', function(assert) {
  let service = this.subject();

  var map = function() {
    service.responseToExploreMap();
  };

  assert.throws(map, Ember.Error, 'Validate instance of Ember.Error');
  assert.throws(map, new Ember.Error('Response not provided.'), 'Validate error message');
});

test('responseToExploreMap when there are no groups then does not call groupToGroupMap', function(assert) {
  let service = this.subject();
  responseToMap.response.groups = [];

  Ember.run(() => {
    service.set('groupToGroupMap', function() {
      assert.ok(false, 'Should not call groupToGroupMap');
      return {};
    });
  });
  service.responseToExploreMap(responseToMap);

  assert.expect(0);
});

test('responseToExploreMap when there are no groups then returns an explore without groups', function(assert) {
  let service = this.subject();
  responseToMap.response.groups = [];

  var explore = service.responseToExploreMap(responseToMap);

  assert.equal(explore.get('groups').length, 0, 'Validate groups is empty');
  assert.equal(explore.get('totalResults'), responseToMap.response.totalResults, 'Validate totalResults is mapped');
});

test('responseToExploreMap when has 2 groups calls groupToGroupMap twice', function(assert) {
  let service = this.subject();
  var expectedGroup1 = responseToMap.response.groups[0];
  var expectedGroup2 = responseToMap.response.groups[1];

  Ember.run(() => {
    service.set('groupToGroupMap', function(group) {
      if(group.name === expectedGroup1.name) {
        assert.equal(group, expectedGroup1, 'Validate group argument1');
      }
      else {
        assert.equal(group, expectedGroup2, 'Validate group argument2');
      }
      assert.ok(true, 'Called groupToGroupMap');
      return {};
    });
  });

  service.responseToExploreMap(responseToMap);

  assert.expect(4);
});

test('responseToExploreMap when there is not totalResults then returns 0', function(assert) {
  let service = this.subject();
  responseToMap.response.groups = [];
  delete responseToMap.response.totalResults;

  var explore = service.responseToExploreMap(responseToMap);

  assert.equal(explore.get('totalResults'), 0, 'Validate totalResults is mapped');
});

test('responseToExploreMap returns an explore object with all the information', function(assert) {
  let service = this.subject();
  var expectedGroup = { type: "group"};
  Ember.run(() => {
    service.set('groupToGroupMap', function() {
      return expectedGroup;
    });
  });

  var explore = service.responseToExploreMap(responseToMap);

  assert.equal(explore.get('totalResults'), responseToMap.response.totalResults, 'Validate totalResults');
  assert.equal(explore.get('groups').length, 2, 'Validate groups');
  assert.equal(explore.get('groups').pop(), expectedGroup, 'Validate group');
});


test('errorToEmberError when no response is provided return server call error', function(assert) {
  let service = this.subject();

  var error = service.errorToEmberError();

  assert.ok(error instanceof Ember.Error, 'Validate ember error is returned');
  assert.equal(error.message, 'Error connecting to Foursquare.', 'Validate message');
});

test('errorToEmberError when meta is missing return server call error', function(assert) {
  let service = this.subject();
  delete errorResponse.meta;

  var error = service.errorToEmberError(errorResponse);

  assert.ok(error instanceof Ember.Error, 'Validate ember error is returned');
  assert.equal(error.message, 'Error connecting to Foursquare.', 'Validate message');
});

test('errorToEmberError when meta missing error detail return error type', function(assert) {
  let service = this.subject();
  delete errorResponse.meta.errorDetail;

  var error = service.errorToEmberError(errorResponse);

  assert.ok(error instanceof Ember.Error, 'Validate ember error is returned');
  assert.equal(error.message, errorResponse.meta.errorType, 'Validate error type is returned');
});

test('errorToEmberError return Ember error with error detail', function(assert) {
  let service = this.subject();

  var error = service.errorToEmberError(errorResponse);

  assert.ok(error instanceof Ember.Error, 'Validate ember error is returned');
  assert.equal(error.message, errorResponse.meta.errorDetail, 'Validate error type is returned');
});


test('exploreVenues - if no query params then throw error', function(assert) {
  let service = this.subject();

  var explore = function() {
    service.exploreVenues();
  };

  assert.throws(explore, Ember.Error, 'Validate instance of Ember.Error');
  assert.throws(explore, new Ember.Error('Query parameters not provided.'), 'Validate error message');
});

test('exploreVenues - if no near parameters then throw error', function(assert) {
  let service = this.subject();

  var explore = function() {
    service.exploreVenues({});
  };

  assert.throws(explore, Ember.Error, 'Validate instance of Ember.Error');
  assert.throws(explore, new Ember.Error('Please provide near parameter.'), 'Validate error message');
});

test('exploreVenues - if no client id then throw error', function(assert) {
  let service = this.subject();
  Ember.run(() => {
    service.set('clientId', undefined);
  });

  var explore = function() {
    service.exploreVenues(validQuery);
  };

  assert.throws(explore, Ember.Error, 'Validate instance of Ember.Error');
  assert.throws(explore, new Ember.Error('No configuration provided.'), 'Validate error message');
});

test('exploreVenues - if no client secret then throw error', function(assert) {
  let service = this.subject();
  Ember.run(() => {
    service.set('clientSecret', undefined);
  });

  var explore = function() {
    service.exploreVenues(validQuery);
  };

  assert.throws(explore, Ember.Error, 'Validate instance of Ember.Error');
  assert.throws(explore, new Ember.Error('No configuration provided.'), 'Validate error message');
});

test('exploreVenues - if no api version then throw error', function(assert) {
  let service = this.subject();
  Ember.run(() => {
    service.set('apiVersion', undefined);
  });

  var explore = function() {
    service.exploreVenues(validQuery);
  };

  assert.throws(explore, Ember.Error, 'Validate instance of Ember.Error');
  assert.throws(explore, new Ember.Error('No configuration provided.'), 'Validate error message');
});

test('exploreVenues - if no foursquare host then throw error', function(assert) {
  let service = this.subject();
  Ember.run(() => {
    service.set('foursquareHost', undefined);
  });

  var explore = function() {
    service.exploreVenues(validQuery);
  };

  assert.throws(explore, Ember.Error, 'Validate instance of Ember.Error');
  assert.throws(explore, new Ember.Error('No configuration provided.'), 'Validate error message');
});
