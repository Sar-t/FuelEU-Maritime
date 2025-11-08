import { query } from "../../../infrastructure/db/db";

export class PgComplianceRepo {
  // Compute Compliance Balance (CB)
  async computeComplianceBalance(shipId: string | undefined, year: number) {
    const result = await query(
      `
      SELECT 
        r.route_id, 
        r.ghg_intensity, 
        r.fuel_consumption, 
        r.year
      FROM routes r
      WHERE r.year = $1;
      `,
      [year]
    );

    const TARGET = 89.3368; // gCO₂e/MJ target
    const MJ_PER_TON = 41000;

    const balances = result.rows.map((r) => {
      const energy = r.fuel_consumption * MJ_PER_TON;
      const cb = (TARGET - r.ghg_intensity) * energy;
      return {
        routeId: r.route_id,
        year: r.year,
        compliance_balance: cb,
      };
    });

    return balances;
  }

  // Get Adjusted CB (mock version for now)
  async getAdjustedComplianceBalance(
    shipId: string | undefined,
    year: number
  ) {
    const rows = await query(
      `SELECT * FROM ship_compliance WHERE year = $1;`,
      [year]
    );
    return rows.rows;
  }
}
