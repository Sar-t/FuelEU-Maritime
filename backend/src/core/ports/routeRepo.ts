// src/core/ports/routeRepo.ts
import { Route } from "../domain/types";

export interface RouteRepo {
  findAll(): Promise<Route[]>;
  findByRouteId(routeId: string): Promise<Route | null>;
  findAllByYear(year: number): Promise<Route[]>;
  findBaseline(): Promise<Route | null>;
  findOthers(baselineRouteId: string, year: number): Promise<Route[]>;
  setBaseline(routeId: string): Promise<void>;
  clearBaselineForYear(year: number): Promise<void>;
  storeCBSnapshot(routeId: string, year: number, cb_g: number): Promise<void>;
}
