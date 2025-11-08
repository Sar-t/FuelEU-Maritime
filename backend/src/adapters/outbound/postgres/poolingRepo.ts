import { query } from "../../../infrastructure/db/db";

export class PgPoolingRepo {
  async createPool(
    members: { shipId: string; cb_before: number }[],
    year: number
  ) {
    const total = members.reduce((sum, m) => sum + m.cb_before, 0);
    if (total < 0) throw new Error("Pool sum cannot be negative");

    const poolRes = await query(
      `INSERT INTO pools (year, created_at) VALUES ($1, NOW()) RETURNING id;`,
      [year]
    );
    const poolId = poolRes.rows[0].id;

    for (const member of members) {
      await query(
        `INSERT INTO pool_members (pool_id, ship_id, cb_before, cb_after)
         VALUES ($1, $2, $3, $4);`,
        [poolId, member.shipId, member.cb_before, member.cb_before]
      );
    }

    return { poolId, total, members };
  }
}
