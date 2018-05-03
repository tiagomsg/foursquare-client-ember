import Ember from 'ember';

export default Ember.Route.extend({
  venuesService: Ember.inject.service('venues-service'),
  queryParams: {
    near: {
      refreshModel: true
    }
  },
  model: function(params) {
    return this.get('venuesService').exploreVenues(params);
  }
});
