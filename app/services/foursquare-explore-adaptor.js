import Ember from 'ember';
import ENV from '../config/environment';
import Venue from '../models/venue';
import Group from '../models/group';
import Explore from '../models/explore';

export default Ember.Service.extend({
  clientId: ENV.clientId,
  clientSecret: ENV.clientSecret,
  apiVersion: ENV.apiVersion,
  foursquareHost: ENV.foursquareHost,

  exploreVenues: function(queryParams) {
    this._validateExploreParams(queryParams);
    var self = this;

    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax({
        type: 'GET',
        url: self._buildUrl(queryParams)
      }).then(function(exploreResponse) {
        var explore;
        try {
          explore = self.responseToExploreMap(exploreResponse);
        } catch(error) {
          reject(error);
        }
        resolve(explore);
      }, function(errorResponse) {
        reject(self.errorToEmberError(errorResponse.responseJSON));
      });
    });
  },
  _validateExploreParams: function(params) {
    if(params === undefined) {
      throw new Ember.Error('Query parameters not provided.');
    }
    if(!params.near) {
      throw new Ember.Error('Please provide near parameter.');
    }
    if(!this.clientId || !this.clientSecret || !this.apiVersion || !this.foursquareHost) {
      throw new Ember.Error('No configuration provided.');
    }
  },
  _buildUrl: function(params) {
    var url = this.foursquareHost + '/venues/explore?client_id=' + this.clientId + '&client_secret=' + this.clientSecret + '&v=' + this.apiVersion;

    Object.keys(params).forEach(function(key) {
      url += "&" + key + "=";
      if(typeof params[key] === 'string') {
        url += params[key].replace(' ', '%20');
      }
      else {
        url += params[key];
      }
    });
    return url;
  },

  itemToVenueMap: function(item) {
    this._validateItem(item);
    var venue = Venue.create({
      id: item.venue.id,
      name: item.venue.name,
      contact: item.venue.contact,
      location: item.venue.location,
      stats: item.venue.stats,
      url: item.venue.url,
      rating: item.venue.rating
    });
    return venue;
  },
  _validateItem: function(item) {
    if(!item) {
      throw new Ember.Error('Item not provided.');
    }
    if(!item.venue) {
      throw new Ember.Error('Item does not contain venue information.');
    }
    if(!item.venue.id) {
      throw new Ember.Error('Venue missing id property.');
    }
    if(!item.venue.name) {
      throw new Ember.Error('Venue missing name property.');
    }
  },

  groupToGroupMap: function(group) {
    this._validateGroup(group);
    var venues = this._itemsListToVenuesListMap(group.items);
    var finalGroup = Group.create({
      type: group.type,
      venues: venues
    });
    return finalGroup;
  },
  _validateGroup: function(group) {
    if(!group) {
      throw new Ember.Error('Group not provided.');
    }
    if(!group.type) {
      throw new Ember.Error('Group missing type property.');
    }
  },
  _itemsListToVenuesListMap: function(items) {
    var venues = [], self = this;
    if(items) {
      items.forEach(function(item) {
        venues.push(self.itemToVenueMap(item));
      });
    }
    return venues;
  },

  responseToExploreMap: function(response) {
    this._validateResponse(response);
    var groups, totalResults;
    if(!response.response.groups) {
      groups = [];
    }
    else {
      groups = this._groupsListToGroupsListMap(response.response.groups);
    }
    if(response.response.totalResults) {
      totalResults = response.response.totalResults;
    }
    else {
      totalResults = 0;
    }

    var explore = Explore.create({
      groups: groups,
      totalResults: totalResults
    });
    return explore;
  },
  _validateResponse: function(response) {
    if(!response) {
      throw new Ember.Error('Response not provided.');
    }
  },
  _groupsListToGroupsListMap(groups) {
    var finalGroups = [], self = this;
    if(groups) {
      groups.forEach(function(group) {
        finalGroups.push(self.groupToGroupMap(group));
      });
    }
    return finalGroups;
  },

  errorToEmberError: function(response) {
    if(response === undefined || !response.meta) {
      return new Ember.Error('Error connecting to Foursquare.');
    }
    if(!response.meta.errorDetail) {
      return new Ember.Error(response.meta.errorType);
    }
    return new Ember.Error(response.meta.errorDetail);
  }
});
