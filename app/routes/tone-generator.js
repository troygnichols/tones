import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('tone-item').then( (found) => {
      if (found.get('length')) {
        return found.filterBy('hasNote', false).toArray();
      } else {
        return this.defaultTones();
      }
    });
  },

  actions: {
    willTransition() {
      this.currentModel.forEach(function(tone) {
        tone.pause();
      });
    }
  },

  defaultTones() {
    return Ember.A([
      this.store.createRecord('tone-item', { waveform: 'sine', frequency: 440 }),
      this.store.createRecord('tone-item', { waveform: 'square', frequency: 220 }),
      this.store.createRecord('tone-item', { waveform: 'sawtooth', frequency: 110 })
    ]);
  }
});
