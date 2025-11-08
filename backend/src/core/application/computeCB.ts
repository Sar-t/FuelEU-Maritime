// src/core/application/computeCB.ts
import { Route } from "../domain/types";

export const TARGET_INTENSITY = 89.3368;  // gCO₂e/MJ
export const MJ_PER_TONNE = 41000;        // energy content

export function computeCBForRoute(route: Route) {
  const energyMJ = Number(route.fuelConsumption) * MJ_PER_TONNE;
  const cb_g = (TARGET_INTENSITY - Number(route.ghgIntensity)) * energyMJ;
  return {
    routeId: route.routeId,
    cb_gco2eq: Number(cb_g.toFixed(6))
  };
}
