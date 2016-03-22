import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tagName: 'button',
  classNameBindings: [':nav-item', 'isActive:active'],

  click() {
    if (this.get('isActive')) { return; }
    this.get('applicationController').transitionToRoute(this.get('route'));
  },

  isActive: function() {
    return this.get('route') === this.get('currentPath');
  }.property('currentPath'),

  applicationController: function() {
    return Ember.getOwner(this).lookup('controller:application');
  }.property(),

  currentPath: function() {
    return this.get('applicationController').currentPath;
  }.property('applicationController.currentPath')
});
