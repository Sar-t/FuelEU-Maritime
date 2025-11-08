// src/adapters/outbound/postgres/bankingRepo.ts
import { BankingRepo, BankEntry } from "../../../core/ports/bankingRepo";
import { query } from "../../../infrastructure/db/db";

export class PgBankingRepo implements BankingRepo {
  async addBankEntry(entry: BankEntry): Promise<BankEntry> {
    const res = await query(
      "INSERT INTO bank_entries (ship_id, year, amount_gco2eq) VALUES ($1,$2,$3) RETURNING *",
      [entry.shipId, entry.year, entry.amount_gco2eq]
    );
    return res.rows[0];
  }

  async getBankedAmount(shipId: string, year: number): Promise<number> {
    const res = await query("SELECT COALESCE(SUM(amount_gco2eq),0) as total FROM bank_entries WHERE ship_id = $1 AND year = $2", [shipId, year]);
    return Number(res.rows[0].total);
  }

  async decreaseBanked(shipId: string, year: number, amount: number): Promise<void> {
    // simple approach: insert negative bank entry to represent application
    await query("INSERT INTO bank_entries (ship_id, year, amount_gco2eq) VALUES ($1,$2,$3)", [shipId, year, -Math.abs(amount)]);
  }
}
