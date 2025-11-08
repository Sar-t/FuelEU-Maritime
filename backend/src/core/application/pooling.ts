// src/core/application/pooling.ts

type PoolMember = { shipId: string; cb_before: number; cb_after?: number };

export function validatePoolMembers(members: PoolMember[]) {
  const sum = members.reduce((s, m) => s + m.cb_before, 0);
  if (sum < 0) throw new Error("Sum of adjusted CB must be >= 0");
}

export function greedyPoolAllocation(members: PoolMember[]): PoolMember[] {
  const deficits = members.filter(m => m.cb_before < 0);
  const surpluses = members.filter(m => m.cb_before > 0);

  const result: PoolMember[] = members.map(m => ({ ...m, cb_after: m.cb_before }));

  for (const s of surpluses) {
    let remaining = s.cb_before;
    for (const d of deficits) {
      if (remaining <= 0) break;
      const need = -d.cb_before;
      const transfer = Math.min(remaining, need);
      remaining -= transfer;
      d.cb_before += transfer;
    }
  }

  return result.map(m => {
    const adjusted = deficits.find(d => d.shipId === m.shipId)
                   || surpluses.find(s => s.shipId === m.shipId);
    return adjusted ? { ...m, cb_after: adjusted.cb_before } : m;
  });
}
