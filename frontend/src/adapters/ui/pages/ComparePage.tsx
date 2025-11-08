import { useEffect, useState } from "react";
import { ComputeComparison } from "../../../core/application/usecases/ComputeComparison";
import { RouteServiceAPI } from "../../infrastructure/RouteServiceAPI";
import DashboardLayout from "../components/DashboardLayout";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function ComparePage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const usecase = new ComputeComparison(new RouteServiceAPI());

  useEffect(() => {
    (async () => {
      const res = await usecase.execute();
      setData(res || []);
      setLoading(false);
    })();
  }, []);

  if (loading)
    return (
      <DashboardLayout title="Compare">
        <p className="text-center text-gray-500 animate-pulse">Loading comparison...</p>
      </DashboardLayout>
    );

  return (
    <DashboardLayout title="GHG Intensity Comparison">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-center rounded-xl">
          <thead className="bg-blue-50 text-blue-800">
            <tr>
              <th className="p-3 border">Route ID</th>
              <th className="p-3 border">Baseline</th>
              <th className="p-3 border">Comparison</th>
              <th className="p-3 border">% Difference</th>
              <th className="p-3 border">Compliant</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r) => (
              <tr
                key={r.routeId}
                className="hover:bg-blue-50 transition-all duration-200"
              >
                <td className="p-2 border">{r.routeId}</td>
                <td className="p-2 border">{r.baseline?.toFixed(2)}</td>
                <td className="p-2 border">{r.comparison?.toFixed(2)}</td>
                <td className="p-2 border">
                  {r.percentDiff?.toFixed(2)}%
                </td>
                <td className="p-2 border">
                  {r.compliant ? "✅" : "❌"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bar Chart */}
      <div className="mt-10 bg-gray-50 rounded-lg p-4">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="routeId" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="baseline" fill="#8884d8" name="Baseline" />
            <Bar dataKey="comparison" fill="#82ca9d" name="Comparison" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardLayout>
  );
}
