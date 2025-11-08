// src/adapters/outbound/postgres/routeRepo.ts
import { Route } from "../../../core/domain/types";
import { RouteRepo } from "../../../core/ports/routeRepo";
import { query } from "../../../infrastructure/db/db";

function mapRowToRoute(row: any): Route {
  return {
    id: row.id,
    routeId: row.route_id,
    vesselType: row.vessel_type,
    fuelType: row.fuel_type,
    year: Number(row.year),
    ghgIntensity: Number(row.ghg_intensity),
    fuelConsumption: Number(row.fuel_consumption),
    distanceKm: Number(row.distance_km),
    totalEmissions: Number(row.total_emissions),
    isBaseline: row.is_baseline
  };
}

export class PgRouteRepo implements RouteRepo {
  async findAll(): Promise<Route[]> {
    const res = await query("SELECT * FROM routes ORDER BY route_id");
    return res.rows.map(mapRowToRoute);
  }

  async findByRouteId(routeId: string): Promise<Route | null> {
    const res = await query("SELECT * FROM routes WHERE route_id = $1 LIMIT 1", [routeId]);
    return res.rows.length ? mapRowToRoute(res.rows[0]) : null;
  }

  async findAllByYear(year: number): Promise<Route[]> {
    const res = await query("SELECT * FROM routes WHERE year = $1", [year]);
    return res.rows.map(mapRowToRoute);
  }

  async findBaseline(): Promise<Route | null> {
    const res = await query("SELECT * FROM routes WHERE is_baseline = true LIMIT 1");
    return res.rows.length ? mapRowToRoute(res.rows[0]) : null;
  }

  async findOthers(baselineRouteId: string, year: number): Promise<Route[]> {
    const res = await query("SELECT * FROM routes WHERE route_id <> $1 AND year = $2", [baselineRouteId, year]);
    return res.rows.map(mapRowToRoute);
  }

  async setBaseline(routeId: string): Promise<void> {
    // find year of that route
    const r = await query("SELECT year FROM routes WHERE route_id = $1 LIMIT 1", [routeId]);
    if (!r.rows.length) throw new Error("Route not found");
    const year = r.rows[0].year;
    await query("UPDATE routes SET is_baseline = false WHERE year = $1", [year]);
    await query("UPDATE routes SET is_baseline = true WHERE route_id = $1", [routeId]);
  }

  async clearBaselineForYear(year: number): Promise<void> {
    await query("UPDATE routes SET is_baseline = false WHERE year = $1", [year]);
  }

  async storeCBSnapshot(routeId: string, year: number, cb_g: number): Promise<void> {
    await query("INSERT INTO ship_compliance (ship_id, year, cb_gco2eq) VALUES ($1,$2,$3)", [routeId, year, cb_g]);
  }
}
