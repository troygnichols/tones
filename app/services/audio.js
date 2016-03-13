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

  newConnectedOscillator() {
    var ctx = this.getAudioContext();
    var osc = ctx.createOscillator();
    osc.connect(ctx.destination);
    return osc;
  }

});
