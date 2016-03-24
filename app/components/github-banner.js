import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  attributeBindings: ['href'],
  classNames: ['github-banner'],

  href: 'https://github.com/troygnichols/tones'
});
