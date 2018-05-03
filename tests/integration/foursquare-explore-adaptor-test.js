import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import Pretender from 'pretender';

var pretenderServer;
var serverCalls = 0;
var returnAPIError = false;
var calledUrl;
var returnInvalidJson = false;

moduleFor('service:foursquare-explore-adaptor', 'Integration | Service | foursquare explore adaptor', {
  needs: ['model:venue',
          'model:group',
          'model:explore'],
  beforeEach: function() {
    serverCalls = 0;
    returnAPIError = false;
    calledUrl = "";
    returnInvalidJson = false;

    pretenderServer = new Pretender(function() {
      this.get("venues/explore", function(request) {
        serverCalls = serverCalls + 1;
        calledUrl = request.url;
        if(returnAPIError) {
          return [400, {"Content-Type": "application/json"}, JSON.stringify({
          	meta: {
          		code: 400,
          		errorType: "failed_geocode",
          		errorDetail: "Couldn't geocode param near: asdqwd",
          		requestId: "569be997498e4d8c7ee75c06"
          	}
          })];
        }
        if(returnInvalidJson) {
          return [200, {"Content-Type": "application/json"}, JSON.stringify({
            meta: {
              code: 200,
              requestId: "569bc8f8498ee273066c0989"
            },
            response: {
              groups: [{}]
            }
          })];
        }
        return [200, {"Content-Type": "application/json"},
        JSON.stringify({
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
        })];
      });
    });
  }
});


test('exploreVenues - if only one query parameter then server called with the right url', function(assert) {
  var adaptor = this.subject();
  var resultPromise;
  var queryParams = {
    near: "test place"
  };
  assert.expect(5);

  Ember.run(() => {
    resultPromise = adaptor.exploreVenues(queryParams);
  });

  resultPromise.then(function(explore) {
    assert.notEqual(explore, undefined, 'Validate explore is returned');
    assert.equal(explore.totalResults, 248, 'Validate it returns the total results');
    assert.equal(explore.groups.length, 2, 'Validate it returns the groups');
    assert.equal(serverCalls, 1, 'Validate the server is called');
    assert.equal(calledUrl, "http://localhost:4200/venues/explore?client_id=test&client_secret=test&v=test&near=test%20place");
  });
});

test('exploreVenues - if more than one query parameter then server called with the right url', function(assert) {
  var adaptor = this.subject();
  var resultPromise;
  var queryParams = {
    near: "test place",
    limit: 10
  };
  assert.expect(2);

  Ember.run(() => {
    resultPromise = adaptor.exploreVenues(queryParams);
  });

  resultPromise.then(function() {
    assert.equal(serverCalls, 1, 'Validate the server is called');
    assert.equal(calledUrl, "http://localhost:4200/venues/explore?client_id=test&client_secret=test&v=test&near=test%20place&limit=10");
  });
});

test('exploreVenues - if mapping response fails then throw error', function(assert) {
  var adaptor = this.subject();
  var resultPromise;
  var queryParams = {
    near: "test place"
  };
  assert.expect(2);
  returnInvalidJson = true;

  Ember.run(() => {
    resultPromise = adaptor.exploreVenues(queryParams);
  });

  resultPromise.then(function() {
  }, function(error) {
    assert.ok(true, 'Validate the mapper threw an error');
    assert.ok(error instanceof Ember.Error, 'Validate the reason is an instance of Ember.Error');
  });
});

test('explore - if service fails returns Ember error from errorToEmberError map function', function(assert) {
  var adaptor = this.subject();
  var resultPromise;
  var queryParams = {
    near: "test place"
  };
  assert.expect(3);
  returnAPIError = true;

  Ember.run(() => {
    resultPromise = adaptor.exploreVenues(queryParams);
  });

  resultPromise.then(function() {
  }, function(error) {
    assert.ok(true, 'Validate the service threw an error');
    assert.ok(error instanceof Ember.Error, 'Validate the reason is an instance of Ember.Error');
    assert.equal(error.message, "Couldn't geocode param near: asdqwd", 'Validate error message');
  });
});
