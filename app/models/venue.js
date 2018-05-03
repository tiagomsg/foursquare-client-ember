import Ember from 'ember';

export default Ember.Object.extend({
  twitter: Ember.computed('contact', function() {
    const cont = this.get('contact');
    if(cont && cont.twitter) {
      return `http://twitter.com/${cont.twitter}`;
    }
    return undefined;
  }),

  facebook: Ember.computed('contact', function() {
    const cont = this.get('contact');
    if(cont && cont.facebookUsername) {
      return `http://facebook.com/${cont.facebookUsername}`;
    }
    return undefined;
  })
});
