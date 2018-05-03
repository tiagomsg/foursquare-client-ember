import { test } from 'qunit';
import moduleForAcceptance from 'foursquare-client-ember/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | user can see venues homepage');


test('visiting / user is directed to venues url', function(assert) {
  visit('/');

  assert.expect(2);
  andThen(function() {
    assert.equal(currentURL(), '/venues', 'Validate url');
    assert.equal(currentRouteName(), 'venues.index', 'Validate route');
  });
});

test('visiting / user can see application bar', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find(".app .app-bar").length, 1, 'Validate app bar is shown');
    assert.equal(find(".app-bar .app-bar-header a:contains('Foursquare Client')").length, 1, 'Validate app name is shown');
    assert.equal(find(".app-bar a[href$='/']:contains('Foursquare Client')").length, 1, 'Validate app name links to venues');
  });
  assert.expect(3);
});

test('visiting / user can see application main and body', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find(".app-main").length, 1, 'Validate app main is shown');
    assert.equal(find(".app-body").length, 1, 'Validate app body is shown');
  });
  assert.expect(2);
});

test('visiting /venues user can see venues search', function(assert) {
  visit('/venues');

  andThen(function() {
    assert.equal(find(".app-main .venues-container").length, 1,
      'Validate venues container is shown in app-main');
    assert.equal(find(".venues-container .venues-search").length, 1,
      'Validate venues search is shown in venues container');
    assert.equal(find(".venues-search h2:contains('Explore Venues')").length, 1,
      'Validate venues search header is shown');
    assert.equal(find(".venues-search form:contains('Places near:')").length, 1,
      'Validate venues search has a form');
  });
  assert.expect(4);
});
