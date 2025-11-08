import { type IRouteService } from "../../ports/IRouteService";
import { type Route } from "../../domain/Route";

export class GetAllRoutes {
  private readonly routeService: IRouteService;

  constructor(routeService: IRouteService) {
    this.routeService = routeService;
  }

  async execute(): Promise<Route[]> {
    return await this.routeService.getAllRoutes();
  }
}
