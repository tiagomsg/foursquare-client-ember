import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('venues', function() {
    this.route('explore');
  });
});

export default Router;
