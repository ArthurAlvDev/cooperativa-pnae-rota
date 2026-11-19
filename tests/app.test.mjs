import test from 'node:test';
import assert from 'node:assert/strict';
import { matchPnaeDeliveries } from '../app.js';

test('allocates producer lots to school demand without exceeding availableKg', () => {
  const { allocations, unmetSchools } = matchPnaeDeliveries(
    [{ producer: 'Sitio A', item: 'Tomate', availableKg: 50 }],
    [{ name: 'Escola 1', item: 'Tomate', demandKg: 30 }, { name: 'Escola 2', item: 'Tomate', demandKg: 20 }]
  );
  assert.equal(allocations.length, 2);
  assert.equal(unmetSchools.length, 0);
});
