// src/core/application/computeComparison.ts
import { Route } from "../domain/types";

export type ComparisonRow = {
  routeId: string;
  baselineIntensity: number;
  comparisonIntensity: number;
  percentDiff: number;
  compliant: boolean;
};

export function compareRoutes(baseline: Route, others: Route[]): ComparisonRow[] {
  return others.map(o => {
    const percentDiff = ((o.ghgIntensity / baseline.ghgIntensity) - 1) * 100;
    const compliant = o.ghgIntensity <= 89.3368;
    return {
      routeId: o.routeId,
      baselineIntensity: baseline.ghgIntensity,
      comparisonIntensity: o.ghgIntensity,
      percentDiff: Number(percentDiff.toFixed(3)),
      compliant
    };
  });
}
