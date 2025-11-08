import { useEffect, useState } from "react";
import { GetAllRoutes } from "../../../core/application/usecases/GetAllRoutes";
import { RouteServiceAPI } from "../../infrastructure/RouteServiceAPI";
import { type Route } from "../../../core/domain/Route";
import DashboardLayout from "../components/DashboardLayout";

export default function RoutesPage() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const usecase = new GetAllRoutes(new RouteServiceAPI());

  useEffect(() => {
    (async () => {
      const data = await usecase.execute();
      setRoutes(data);
      setLoading(false);
    })();
  }, []);

  if (loading)
    return (
      <DashboardLayout title="Routes">
        <p className="text-center text-gray-500 animate-pulse">Loading routes...</p>
      </DashboardLayout>
    );

  return (
    <DashboardLayout title="Registered Routes">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-xl">
          <thead className="bg-blue-50 text-blue-800">
            <tr>
              <th className="p-3 border">Route ID</th>
              <th className="p-3 border">Vessel</th>
              <th className="p-3 border">Fuel</th>
              <th className="p-3 border">Year</th>
              <th className="p-3 border">GHG</th>
              <th className="p-3 border">Fuel (t)</th>
              <th className="p-3 border">Distance (km)</th>
              <th className="p-3 border">Emissions (t)</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((r) => (
              <tr
                key={r.route_id}
                className="hover:bg-blue-50 transition-all duration-200 text-center"
              >
                <td className="p-2 border">{r.route_id}</td>
                <td className="p-2 border">{r.vessel_type}</td>
                <td className="p-2 border">{r.fuel_type}</td>
                <td className="p-2 border">{r.year}</td>
                <td className="p-2 border">{r.ghg_intensity}</td>
                <td className="p-2 border">{r.fuel_consumption}</td>
                <td className="p-2 border">{r.distance_km}</td>
                <td className="p-2 border">{r.total_emissions}</td>
                <td className="p-2 border">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm">
                    Set Baseline
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
