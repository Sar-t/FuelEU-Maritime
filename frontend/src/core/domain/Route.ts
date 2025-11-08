export interface Route {
  route_id: string;
  vessel_type: string;
  fuel_type: string;
  year: number;
  ghg_intensity: number;
  fuel_consumption: number;
  distance_km: number;
  total_emissions: number;
  is_baseline?: boolean;
}
