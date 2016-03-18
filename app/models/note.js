import DS from 'ember-data';
import Ember from 'ember';

const { Logger: { debug }, computed: { alias }, inject: { service }, observer } = Ember;

export default DS.Model.extend({

  pitch: DS.attr('string', { defaultValue: 'C' }),
  modulator: DS.attr('string', { defaultValue: 'natural' }),
  octave: DS.attr('number', { defaultValue: 4 }),

  tone: DS.belongsTo('tone-item'),

  frequency: alias('tone.frequency'),
  waveform: alias('tone.waveform'),
  isPlaying: alias('tone.isPlaying'),

  notes: service(),

  updateFrequency: observer('pitch', 'modulator', 'octave', 'tone', function() {
    var pitch = this.get('pitch'), mod = this.get('modulator'), octave = this.get('octave');
    var freq = this.get('notes').frequencyForPitch(pitch, mod, octave);
    debug(`updateFrequency, pitch: ${pitch}, modulator: ${mod}, octave: ${octave}, freq: ${freq}`);

    this.set('frequency', freq);
  }),
});
