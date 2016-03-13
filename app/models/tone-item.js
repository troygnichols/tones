import DS from 'ember-data';
import Ember from 'ember';

const { Logger: { debug, error }, inject: { service }, observer } = Ember;

export default DS.Model.extend({
  waveform: DS.attr('string', { defaultValue: 'sine' }),
  frequency: DS.attr('number', { defaultValue: 440 }),
  isPlaying: DS.attr('boolean', { defaultValue: false }),

  audio: service('audio'),

  oscillator: function() {
    var osc = this.get('_cachedOscillator');
    if (osc) {
      return osc;
    }

    osc = this.get('audio').newConnectedOscillator();
    this.set('_cachedOscillator', osc);

    return osc;
  }.property(),

  playOrPause: observer('isPlaying', 'frequency', 'waveform', function() {
    debug('playOrPause tone: ', this);

    var osc = this.get('oscillator');

    if (this.get('isPlaying')) {
      osc.frequency.value = this.get('frequency');

      if (!osc.isStarted) {
        osc.start(0);
        osc.isStarted = true;
      }

    } else {
      osc.frequency.value = 0;
    }

    osc.type = this.get('waveform');
  }),

  pause() {
    debug('Pausing tone', this);
    var osc = this.get('_cachedOscillator');

    if (!osc) {
      debug('No oscillator for tone, nothing to do');
      return;
    }

    osc.frequency.value = 0;
  },

  didDelete: function() {
    var osc = this.get('_cachedOscillator'),
        id = this.get('id');

    if (osc) {
      debug(`Stopping oscillator on deletion of tone ${id}`);
      try {
        osc.disconnect();
      } catch (e) {
        error('Failed to stop oscillator for tone', e, this);
      }
    } else {
      debug(`No oscillator running on deletion of tone ${id}`);
    }
  }
});
