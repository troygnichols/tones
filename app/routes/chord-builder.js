import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('note').then( (found) => {
      if (found.get('length')) {
        return found;
      } else {
        return this.defaultNotes();
      }
    });
  },

  defaultNotes() {
    return Ember.A([
      this.store.createRecord('note', { tone: this.store.createRecord('tone-item'), pitch: 'C' }),
      this.store.createRecord('note', { tone: this.store.createRecord('tone-item'), pitch: 'E' }),
      this.store.createRecord('note', { tone: this.store.createRecord('tone-item'), pitch: 'G' })
    ]);
  }
});
