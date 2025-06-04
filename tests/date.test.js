const assert = require('assert');

function parseFrDate(str) {
  const [j, m, a] = str.split(/[\/\-]/);
  return new Date(`${a}-${m}-${j}T00:00:00`);
}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

(function run() {
  const d1 = parseFrDate('15/02/2024');
  assert.ok(isValidDate(d1), 'date invalide pour 15/02/2024');
  assert.strictEqual(d1.getFullYear(), 2024);
  assert.strictEqual(d1.getMonth(), 1); // février => 1 (0-indexé)
  assert.strictEqual(d1.getDate(), 15);

  const d2 = parseFrDate('15-02-2024');
  assert.ok(isValidDate(d2), 'date invalide pour 15-02-2024');
  assert.strictEqual(d2.getFullYear(), 2024);
  assert.strictEqual(d2.getMonth(), 1);
  assert.strictEqual(d2.getDate(), 15);

  console.log('Tous les tests passent.');
})();
