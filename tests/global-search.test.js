const assert = require('assert');

function matchRow(row, q) {
  const terms = q.toLowerCase().split(/\s+/);
  // all query words must appear in at least one cell
  return terms.every(t =>
    Object.values(row).some(v => String(v).toLowerCase().includes(t))
  );
}

describe('matchRow', function() {
  it('match across columns', function() {
    const row = { city: 'London', year: 2024 };
    assert.ok(matchRow(row, 'London 2024'));
  });

  it('fails if a term is missing', function() {
    const row = { city: 'London', year: 2024 };
    assert.ok(!matchRow(row, 'London 2023'));
  });
});
