import Ember from 'ember';

const { inject: { service }, Logger: { debug } } = Ember;

export default Ember.Component.extend({
  classNames: ['tone-generator'],

  store: service(),

  audio: service('audio'),

  waveformOptions: Ember.A([
    'sine', 'square', 'sawtooth', 'triangle'
  ]),

  actions: {
    toggleTones(isToggled, tone) {
      debug(`toggle tone: ${isToggled}`, tone);
      tone.set('isPlaying', isToggled);
    },

    pauseAll() {
    },

    removeTone(tone) {
      this.get('tones').removeObject(tone);
      tone.destroyRecord();
    },

    addTone() {
      var newTone = this.get('store').createRecord('tone-item');
      this.get('tones').pushObject(newTone);
    }
  }

});
