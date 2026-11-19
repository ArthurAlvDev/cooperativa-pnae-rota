export function matchPnaeDeliveries(lots = [], schools = []) {
  const remaining = lots.map((l) => ({ ...l }));
  const allocations = [];

  for (const school of schools) {
    let needed = Number(school.demandKg) || 0;
    for (const lot of remaining) {
      if (needed <= 0) break;
      if (lot.item === school.item && lot.availableKg > 0) {
        const qty = Math.min(needed, lot.availableKg);
        lot.availableKg -= qty;
        needed -= qty;
        allocations.push({
          school: school.name,
          producer: lot.producer,
          item: lot.item,
          qtyKg: qty
        });
      }
    }
  }
  return { allocations, unmetSchools: schools.filter((s) => s.demandKg > 0 && allocations.filter((a) => a.school === s.name).reduce((acc, a) => acc + a.qtyKg, 0) < s.demandKg) };
}
