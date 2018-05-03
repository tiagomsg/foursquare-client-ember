import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    exploreVenues(place) {
      var queryParams = {
        queryParams: {
          near: place
        }
      };
      this.transitionTo('venues.explore', queryParams);
    }
  }
});
