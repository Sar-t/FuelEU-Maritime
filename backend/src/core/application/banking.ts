// src/core/application/banking.ts

export async function bankSurplus(repo: any, shipId: string, year: number, amount_g: number) {
  if (amount_g <= 0) throw new Error("No positive CB to bank.");
  const entry = await repo.addBankEntry({ shipId, year, amount_gco2eq: amount_g });
  return entry;
}

export async function applyBanked(repo: any, shipId: string, year: number, amountToApply: number) {
  const balance = await repo.getBankedAmount(shipId, year);
  if (amountToApply > balance) throw new Error("Insufficient banked amount.");
  await repo.decreaseBanked(shipId, year, amountToApply);
  return { applied: amountToApply, remaining: balance - amountToApply };
}
