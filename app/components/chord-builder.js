import Ember from 'ember';

const { inject: { service }, String: { htmlSafe } } = Ember;

export default Ember.Component.extend({
  classNames: ['chord-builder'],

  store: service(),

  pitchOptions: Ember.A([
    'A', 'B', 'C', 'D', 'E', 'F', 'G'
  ]),

  modulatorOptions: function() {
    return Ember.A([
      Ember.Object.create({ name: this.get('naturalSymbol'), value: 'natural' }),
      Ember.Object.create({ name: this.get('flatSymbol'),    value: 'flat' }),
      Ember.Object.create({ name: this.get('sharpSymbol'),   value: 'sharp' })
    ]);
  }.property('flatSymbol', 'naturalSymbol', 'sharpSymbol'),

  waveformOptions: Ember.A([
    'sine', 'square', 'sawtooth', 'triangle'
  ]),

  flatSymbol: htmlSafe('&#9837'),

  naturalSymbol: htmlSafe('&#9838'),

  sharpSymbol: htmlSafe('&#9839'),

  actions: {
  }
});
