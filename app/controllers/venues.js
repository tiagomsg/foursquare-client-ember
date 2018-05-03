import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    explore(place) {
      this.exploreVenues(place);
    }
  },

  exploreVenues(place) {
    this.send('exploreVenues', place);
  }
});
