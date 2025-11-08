// src/core/domain/types.ts

export type Route = {
  id?: number;
  routeId: string;
  vesselType: string;
  fuelType: string;
  year: number;
  ghgIntensity: number;       // gCO₂e/MJ
  fuelConsumption: number;    // tonnes
  distanceKm: number;         // km
  totalEmissions: number;     // tonnes
  isBaseline?: boolean;
};

export type CBResult = {
  routeId: string;
  year?: number;
  cb_gco2eq: number;          // Compliance Balance in gCO₂e
};
