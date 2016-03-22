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

  distanceBetweenPitches(p1, p2) {
    p1 = `${p1.toLowerCase()}`;
    p2 = `${p2.toLowerCase()}`;

    var map = this.pitchToNumberMap;
    return Math.abs(map[p2] - map[p1]);
  },

  pitchBefore(pitchLetter) {
    var letter = `${pitchLetter}`.toLowerCase();
    var pitches = this.get('allPitches');
    var pitchIndex  = pitches.indexOf(letter);
    var pitchBefore = pitches[pitchIndex-1];
    if (pitchBefore) {
      return pitchBefore;
    } else {
      return pitches[pitches.length - 1];
    }
  },

  pitchAfter(pitchLetter) {
    var letter = `${pitchLetter}`.toLowerCase();
    var pitches = this.get('allPitches');
    var pitchIndex  = pitches.indexOf(letter);
    var pitchAfter = pitches[pitchIndex + 1];
    if (pitchAfter) {
      return pitchAfter;
    } else {
      return pitches[0];
    }
  },

  normalizeAsSharps(pitch, modulator) {
    pitch = `${pitch}`.toLowerCase();
    modulator = `${modulator}`.toLowerCase();

    if (modulator === 'natural') {
      return pitch.toUpperCase();
    }

    var nextPitch = this.pitchAfter(pitch),
        dist = this.distanceBetweenPitches(pitch, nextPitch);

    if (modulator === 'sharp') {

      // e.g. B# == C
      if (dist === 1) {
        return `${nextPitch}`.toUpperCase();
      } else {
        return `${pitch.toUpperCase()}-sharp`;
      }
    }

    // flat
    var prevPitch = this.pitchBefore(pitch);
    dist = this.distanceBetweenPitches(pitch, prevPitch);

    // e.g. Eb == F
    if (dist === 1) {
      return `${prevPitch}`.toUpperCase();
    } else {
      return `${prevPitch.toUpperCase()}-sharp`;
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
  },

  allPitches: function() {
    var pitches = [];

    for (var key in this.pitchToNumberMap) {
      if (this.pitchToNumberMap.hasOwnProperty(key)) {
        pitches.push(key);
      }
    }

    return pitches;
  }.property()
});
