const assert = require('assert');

function matchRow(row, q) {
  const terms = q.toLowerCase().split(/\s+/);
  // all query words must appear in at least one cell
  return terms.every(t =>
    Object.values(row).some(v => String(v).toLowerCase().includes(t))
  );
}

(function run(){
  const row = { city: 'London', year: 2024 };
  assert.ok(matchRow(row, 'London 2024'), 'should match across columns');
  assert.ok(!matchRow(row, 'London 2023'), 'should fail if a term is missing');
  console.log('Tous les tests matchRow passent.');
})();
