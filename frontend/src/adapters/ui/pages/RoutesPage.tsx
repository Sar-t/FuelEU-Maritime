import { useEffect, useState } from "react";
import { GetAllRoutes } from "../../../core/application/usecases/GetAllRoutes";
import { RouteServiceAPI } from "../../infrastructure/RouteServiceAPI";
import type { Route } from "../../../core/domain/Route"; // ✅ FIXED

export default function RoutesPage() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const usecase = new GetAllRoutes(new RouteServiceAPI());

  useEffect(() => {
    usecase.execute().then(setRoutes);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Routes</h2>
      <table className="min-w-full border border-gray-300 text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Route ID</th>
            <th className="border p-2">Vessel Type</th>
            <th className="border p-2">Fuel</th>
            <th className="border p-2">Year</th>
            <th className="border p-2">GHG</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((r) => (
            <tr key={r.route_id}>
              <td className="border p-1">{r.route_id}</td>
              <td className="border p-1">{r.vessel_type}</td>
              <td className="border p-1">{r.fuel_type}</td>
              <td className="border p-1">{r.year}</td>
              <td className="border p-1">{r.ghg_intensity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
