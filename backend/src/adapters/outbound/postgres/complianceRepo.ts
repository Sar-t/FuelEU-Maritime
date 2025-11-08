import { query } from "../../../infrastructure/db/db";

export class PgComplianceRepo {
  // 🧮 Compute and store Compliance Balance (CB)
  async computeComplianceBalance(shipId: string | undefined, year: number) {
    // 1️⃣ Fetch routes for the given year
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
    const MJ_PER_TON = 41000; // Energy content in MJ per ton of fuel

    // 2️⃣ Compute balances
    const balances = result.rows.map((r) => {
      const energy = Number(r.fuel_consumption) * MJ_PER_TON;
      const cb = (TARGET - Number(r.ghg_intensity)) * energy;
      return {
        ship_id: r.route_id, // using routeId as unique ship identifier
        year: Number(r.year),
        cb_gco2eq: cb,
      };
    });

    // 3️⃣ Persist results into ship_compliance (upsert)
    for (const rec of balances) {
      await query(
        `
        INSERT INTO ship_compliance (ship_id, year, cb_gco2eq)
        VALUES ($1, $2, $3)
        ON CONFLICT (ship_id, year)
        DO UPDATE SET cb_gco2eq = EXCLUDED.cb_gco2eq;
        `,
        [rec.ship_id, rec.year, rec.cb_gco2eq]
      );
    }

    // 4️⃣ Return the computed balances
    return balances.map((b) => ({
      routeId: b.ship_id,
      year: b.year,
      compliance_balance: b.cb_gco2eq,
    }));
  }

  // ⚖️ Get Adjusted CB (after persistence)
  async getAdjustedComplianceBalance(shipId: string | undefined, year: number) {
    const rows = await query(
      `
      SELECT ship_id AS routeId, year, cb_gco2eq AS compliance_balance
      FROM ship_compliance
      WHERE year = $1
      ORDER BY ship_id;
      `,
      [year]
    );

    return rows.rows;
  }
}
