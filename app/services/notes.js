import Ember from 'ember';

export default Ember.Service.extend({
  frequencyForPitch(pitch, modulator='natural', octave=4) {
    // see https://en.wikipedia.org/wiki/Piano_key_frequencies

    var dist = this.distanceFromA(pitch, modulator);

    var moves = Math.abs(dist);

    var freq = 440; // start form A4 (440Hz)

    var multiplier = 1.059463094359295;

    for (var i=0; i < moves; i++) {
      if (dist >= 0) {
        // moving up from A4, multiply
        freq = freq * multiplier;

      } else {
        // moving down from A4, divide
        freq = freq / multiplier;
      }
    }

    var octaveFactor = Math.pow(2, (octave - 4));

    return freq * octaveFactor;
  },

  distanceFromA(pitch, modulator)  {
    pitch = `${pitch}`.toLowerCase();

    var pitchNum = this.pitchToNumberMap[pitch];

    switch (modulator) {
      case 'sharp':
        return pitchNum + 1;
      case 'flat':
        return pitchNum - 1;
      default:
        return pitchNum;
    }
  },

  pitchToNumberMap: {
    a: 0,
    b: 2,
    c: 3,
    d: 5,
    e: 7,
    f: 8,
    g: 10
  }
});
