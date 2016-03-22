import { moduleFor, test } from 'ember-qunit';

moduleFor('service:notes', 'Unit | Service | notes', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('pitchBefore', function(assert) {
  let service = this.subject();

  assert.equal(service.pitchBefore('A'), 'g');
  assert.equal(service.pitchBefore('B'), 'a');
  assert.equal(service.pitchBefore('b'), 'a');
  assert.equal(service.pitchBefore('e'), 'd');
});

test('pitchAfter', function(assert) {
  let service = this.subject();

  assert.equal(service.pitchAfter('G'), 'a');
  assert.equal(service.pitchAfter('a'), 'b');
  assert.equal(service.pitchAfter('A'), 'b');
  assert.equal(service.pitchAfter('e'), 'f');
});

test('normalizeAsSharps', function(assert) {
  let service = this.subject();

  assert.equal(service.normalizeAsSharps('A', 'flat'), 'G-sharp');
  assert.equal(service.normalizeAsSharps('A', 'natural'), 'A');
  assert.equal(service.normalizeAsSharps('A', 'sharp'), 'A-sharp');

  assert.equal(service.normalizeAsSharps('B', 'flat'), 'A-sharp');
  assert.equal(service.normalizeAsSharps('B', 'natural'), 'B');
  assert.equal(service.normalizeAsSharps('B', 'sharp'), 'C');

  assert.equal(service.normalizeAsSharps('C', 'flat'), 'B');
  assert.equal(service.normalizeAsSharps('C', 'natural'), 'C');
  assert.equal(service.normalizeAsSharps('C', 'sharp'), 'C-sharp');

  assert.equal(service.normalizeAsSharps('D', 'flat'), 'C-sharp');
  assert.equal(service.normalizeAsSharps('D', 'natural'), 'D');
  assert.equal(service.normalizeAsSharps('D', 'sharp'), 'D-sharp');

  assert.equal(service.normalizeAsSharps('E', 'flat'), 'D-sharp');
  assert.equal(service.normalizeAsSharps('E', 'natural'), 'E');
  assert.equal(service.normalizeAsSharps('E', 'sharp'), 'F');

  assert.equal(service.normalizeAsSharps('F', 'flat'), 'E');
  assert.equal(service.normalizeAsSharps('F', 'natural'), 'F');
  assert.equal(service.normalizeAsSharps('F', 'sharp'),  'F-sharp');

  assert.equal(service.normalizeAsSharps('G', 'flat'), 'F-sharp');
  assert.equal(service.normalizeAsSharps('G', 'natural'), 'G');
  assert.equal(service.normalizeAsSharps('G', 'sharp'), 'G-sharp');
});
