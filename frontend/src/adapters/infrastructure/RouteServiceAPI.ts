import { api } from "./apiClient.ts";
import { type IRouteService } from "../../core/ports/IRouteService";
import type { Route } from "../../core/domain/Route"; // ✅ FIXED

export class RouteServiceAPI implements IRouteService {
  async getAllRoutes(): Promise<Route[]> {
    const res = await api.get("/routes");
    return res.data;
  }

  async setBaseline(routeId: string): Promise<void> {
    await api.post(`/routes/${routeId}/baseline`);
  }

  async getComparison(): Promise<any[]> {
    const res = await api.get("/routes/comparison");
    return res.data;
  }
}
