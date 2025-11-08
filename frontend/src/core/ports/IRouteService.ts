import type { Route } from "../domain/Route";

export interface IRouteService {
  getAllRoutes(): Promise<Route[]>;
  setBaseline(routeId: string): Promise<void>;
  getComparison(): Promise<any[]>;
}
