import { Route } from "../../core/domain/types";

test("Route type should define required properties", () => {
  const route: Route = {
    routeId: "R001",
    vesselType: "Container",
    fuelType: "HFO",
    year: 2024,
    ghgIntensity: 91.0,
    fuelConsumption: 5000,
    distanceKm: 12000,
    totalEmissions: 4500
  };
  expect(route.vesselType).toBe("Container");
});
