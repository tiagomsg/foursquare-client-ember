import { moduleFor, test } from 'ember-qunit';

moduleFor('model:venue', 'Unit | Model | venue');

test('it exists', function(assert) {
  let venue = this.subject();
  assert.ok(!!venue);
});

test('twitter - when no contact information return undefined', function(assert) {
  const venue = this.subject();

  assert.equal(venue.get('twitter'), undefined);
});

test('twitter - when no twitter information return undefined', function(assert) {
  const venue = this.subject();

  venue.set('contact', { });

  assert.equal(venue.get('twitter'), undefined);
});

test('twitter - should correctly concat twitter name with twitter url', function(assert) {
  const venue = this.subject();

  venue.set('contact', { twitter: "tussaudslondon" });

  assert.equal(venue.get('twitter'), 'http://twitter.com/tussaudslondon');
});

test('facebook - when no contact information return undefined', function(assert) {
  const venue = this.subject();

  assert.equal(venue.get('facebook'), undefined);
});

test('facebook - when no facebook information return undefined', function(assert) {
  const venue = this.subject();

  venue.set('contact', { });

  assert.equal(venue.get('facebook'), undefined);
});

test('facebook - should correctly concat facebook name with facebook url', function(assert) {
  const venue = this.subject();

  venue.set('contact', { facebookUsername: "officialmadametussaudslondon" });

  assert.equal(venue.get('facebook'), 'http://facebook.com/officialmadametussaudslondon');
});
