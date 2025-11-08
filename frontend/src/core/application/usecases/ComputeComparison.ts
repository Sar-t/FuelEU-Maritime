import {type IRouteService } from "../../ports/IRouteService";

/**
 * Use case: ComputeComparison
 * --------------------------------
 * This use case coordinates comparison logic between
 * baseline route(s) and all others via the IRouteService.
 * It simply delegates the logic to the route service adapter,
 * which handles API communication.
 */
export class ComputeComparison {
  private readonly routeService: IRouteService;

  constructor(routeService: IRouteService) {
    this.routeService = routeService;
  }

  async execute() {
    return await this.routeService.getComparison();
  }
}
