import Ember from 'ember';

const {
  inject: { service },
  Logger: { debug },
  RSVP:   { Promise },
  run:    { later }
} = Ember;

export default Ember.Component.extend({
  classNames: ['tone-generator'],

  store: service(),

  audio: service('audio'),

  waveformOptions: Ember.A([
    'sine', 'square', 'sawtooth', 'triangle'
  ]),

  init() {
    this.get('tones').forEach( (tone) => {
      tone.playOrPause();
      return this._super(...arguments);
    });
  },

  actions: {
    toggleTones(isToggled, tone) {
      debug(`toggle tone: ${isToggled}`, tone);
      tone.set('isPlaying', isToggled);
    },

    playAll() {
      this.get('tones').forEach( (tone) => {
        tone.set('isPlaying', true);
      });
    },

    pauseAll() {
      this.get('tones').forEach( (tone) => {
        tone.set('isPlaying', false);
      });
    },

    removeTone(tone) {
      this.get('tones').removeObject(tone);
      tone.destroyRecord();
    },

    addTone() {
      var newTone = this.get('store').createRecord('tone-item');
      this.get('tones').pushObject(newTone);
    },

    save() {
      this.set('isSaving', true);

      var promises = [];

      this.get('tones').forEach( (tone) => {
        promises.push(tone.save());
      });

      Promise.all(promises).then( () => {
        this.setProperties({ isSaving: false, hasSavedRecently: true });
        later(this, () => {
          this.set('hasSavedRecently', false);
        }, 1250);
      });
    }
  }

});
