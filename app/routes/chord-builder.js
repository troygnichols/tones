import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('note').then( (found) => {
      if (found.get('length')) {
        return found.toArray();
      } else {
        return this.defaultNotes();
      }
    });
  },

  actions: {
    willTransition() {
      this.currentModel.forEach( (note) => {
        var tone = note.get('tone');
        if (tone) {
          tone.pause();
        }
      });
    }
  },

  defaultNotes() {
    return Ember.A([
      this.store.createRecord('note', { tone: this.store.createRecord('tone-item', { hasNote: true }), pitch: 'C' }),
      this.store.createRecord('note', { tone: this.store.createRecord('tone-item', { hasNote: true }), pitch: 'E' }),
      this.store.createRecord('note', { tone: this.store.createRecord('tone-item', { hasNote: true }), pitch: 'G' })
    ]);
  }
});
