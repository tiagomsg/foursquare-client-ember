import { test } from 'qunit';
import moduleForAcceptance from 'foursquare-client-ember/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | user can see search results test');

test('visiting /venues/explore?near=test%20place user can see explore results', function(assert) {
  visit('/venues/explore?near=no%20results');

  andThen(function() {
    assert.equal(find(".venues-container .explore-results").length, 1,
      'Validate explore results is shown');
    assert.equal(find(".explore-results h3:contains('Results: 0')").length, 1,
      'Validate explore results is shown');
    assert.equal(find(".explore-results:contains('Sorry, there are no results for the place you searched')").length, 1,
      'Validate no results message is shown');
  });
  assert.expect(3);
});

test('visiting /venues/explore?near=test%20place user can see groups', function(assert) {
  visit('/venues/explore?near=test%20place');

  andThen(function() {
    assert.equal(find(".explore-results .groups").length, 1,
      'Validate group bodies are shown');
    assert.equal(find(".groups .group-body h4:contains('Recommended Places')").length, 1,
      'Validate can see first group');
    assert.equal(find(".groups .group-body h4:contains('Popular Places')").length, 1,
      'Validate can see second group');
  });
  assert.expect(3);
});

test('visiting /venues/explore?near=test%20place user can see venues', function(assert) {
  visit('/venues/explore?near=test%20place');

  andThen(function() {
    assert.equal(find(".groups .venue-panel").length, 3,
      'Validate venue names are shown');
    assert.equal(find(".venue-panel label:contains('National Gallery')").length, 1,
      'Validate can see National Gallery');
    assert.equal(find(".venue-panel label:contains('British Museum')").length, 1,
      'Validate can see British Museum');
    assert.equal(find(".venue-panel label:contains('Madame Tussauds')").length, 1,
      'Validate can see Madame Tussauds');
  });
  assert.expect(4);
});

test('visiting /venues/explore?near=test%20place user can see venue panel with some details', function(assert) {
  visit('/venues/explore?near=test%20place');

  andThen(function() {
    assert.equal(find(".venue-panel span:contains('37654')").length, 1,
      'Validate can see number of checkins');
    assert.equal(find(".venue-panel span:contains('9.6')").length, 1,
      'Validate can see rating');
  });
  assert.expect(2);
});

test('visiting /venues/explore?near=test%20place when user does not click in a venue name then cannot see venue details', function(assert) {
  visit('/venues/explore?near=test%20place');

  andThen(function() {
    assert.equal(find(".groups .venue-body .row").length, 0,
      'Validate venue body is shown');
  });
  assert.expect(1);
});

test('visiting /venues/explore?near=test%20place when user clicks on venue name then suer can see venue details', function(assert) {
  visit('/venues/explore?near=test%20place');

  click(".explore-results .venue-panel:contains('National Gallery')");

  andThen(function() {
    assert.equal(find(".groups .venue-body").length, 1,
      'Validate venue body is shown');
    assert.equal(find(".venue-body p:contains('+44 20 7747 2885')").length, 1,
      'Validate can see formattedPhone');
    assert.equal(find(".venue-body a[href$='http://twitter.com/nationalgallery']:contains('twitter')").length, 1,
      'Validate can see twitter link');
    assert.equal(find(".venue-body a[href$='http://facebook.com/thenationalgallery']:contains('facebook')").length, 1,
      'Validate can see facebook link');
    assert.equal(find(".venue-body p:contains('Trafalgar Sq')").length, 1,
      'Validate can see address');
    assert.equal(find(".venue-body p:contains('WC2N 5DN')").length, 1,
      'Validate can see postal code');
    assert.equal(find(".venue-body p:contains('London')").length, 1,
      'Validate can see city');
    assert.equal(find(".venue-body p:contains('Reino Unido')").length, 1,
      'Validate can see country');
    assert.equal(find(".venue-body a:contains('http://www.nationalgallery.org.uk')").length, 1,
      'Validate can see url');
  });
  assert.expect(9);
});

//TODO: Cannot be executed due to the following open issue: https://github.com/emberjs/ember.js/issues/12791
// test('visiting /venues/explore?near= user sees error message', function(assert) {
//   visit('/venues/explore?near=');
//
//   andThen(function() {
//     assert.equal(find(".explore-error").length, 1,
//     'Validate explore error is shown');
//     assert.equal(find(".explore-error:contains('Sorry, there was a problem with your request!')").length, 1,
//       'Validate generic message is shown');
//     assert.equal(find(".explore-error:contains('Near value not provided.')").length, 1,
//       'Validate error detail is shown');
//   });
//   assert.expect(3);
// });
