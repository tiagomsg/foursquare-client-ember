import Ember from 'ember';

export default Ember.Service.extend({
  exploreService: Ember.inject.service('foursquare-explore-adaptor'),

  exploreVenues: function(queryParams) {
    if(!queryParams || !queryParams.near) {
      throw new Ember.Error('Near value not provided.');
    }

    return this.get('exploreService').exploreVenues(queryParams);
  }
});
