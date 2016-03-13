import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.A([
      this.store.createRecord('tone-item', { waveform: 'sine', frequency: 440 }),
      this.store.createRecord('tone-item', { waveform: 'square', frequency: 220 }),
      this.store.createRecord('tone-item', { waveform: 'sawtooth', frequency: 110 })
    ]);
  },

  actions: {
    willTransition() {
      this.currentModel.forEach(function(tone) {
        tone.pause();
      });
    }
  }
});
