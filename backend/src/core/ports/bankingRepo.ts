// src/core/ports/bankingRepo.ts
export type BankEntry = { id?: number; shipId: string; year: number; amount_gco2eq: number; createdAt?: string };

export interface BankingRepo {
  addBankEntry(entry: BankEntry): Promise<BankEntry>;
  getBankedAmount(shipId: string, year: number): Promise<number>;
  decreaseBanked(shipId: string, year: number, amount: number): Promise<void>;
}
