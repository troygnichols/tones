import Ember from 'ember';

const {
  inject: { service },
  String: { htmlSafe },
  RSVP:   { Promise },
  run:    { later }
} = Ember;

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

  init() {
    this.get('notes').forEach( (note) => {
      // This is kind of hacky, but the only way I found to get the note's tone
      // to call its playOrPause function. note('tone') seems to return something
      // that is not actually a full ToneItem object, or at any rate it does not
      // have a playOrPause function defined. Pinging the observed property
      // 'invokePlayOrPause' causes the tone's playOrPause to fire.
      note.set('tone.invokePlayOrPause', true);
    });
    return this._super(...arguments);
  },

  actions: {
    toggleNotes(isToggled, note) {
      console.log('toggleNotes called', note);
    },

    addNote() {
      var newNote = this.get('store').createRecord('note', {
        pitch: 'C',
        tone: this.get('store').createRecord('tone-item')
      });

      this.get('notes').pushObject(newNote);
    },

    removeNote(note) {
      this.get('notes').removeObject(note);
    },

    playAll() {
      this.get('notes').forEach( (note) => {
        note.set('isPlaying', true);
      });
    },

    pauseAll() {
      this.get('notes').forEach( (note) => {
        note.set('isPlaying', false);
      });
    },

    save() {
      this.set('isSaving', true);

      var promises = [];

      this.get('notes').forEach( (note) => {
        promises.push(note.save());
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
