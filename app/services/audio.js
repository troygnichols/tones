import Ember from 'ember';

export default Ember.Service.extend({
  audioContext: null,

  getAudioContext() {
    if (this.get('audioContext')) {
      return this.get('audioContext');
    }

    var ctx;
    ctx = new AudioContext(); // jshint ignore:line
    this.set('audioContext', ctx);

    return ctx;
  },

  newOscillator() {
    var ctx = this.getAudioContext();
    var osc = ctx.createOscillator();
    return osc;
  },

  newGainNodeForSource(source) {
    var ctx = this.getAudioContext();
    var gainNode = ctx.createGain();
    source.connect(gainNode);
    return gainNode;
  }

});
