import { useEffect, useState } from "react";
import { ComputeComparison } from "../../../core/application/usecases/ComputeComparison";
import { RouteServiceAPI } from "../../infrastructure/RouteServiceAPI";

interface Comparison {
  routeId: string;
  baseline: number;
  comparison: number;
  percentDiff: number;
  compliant: boolean;
}

export default function ComparePage() {
  const [data, setData] = useState<Comparison[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const usecase = new ComputeComparison(new RouteServiceAPI());

  useEffect(() => {
    (async () => {
      try {
        const res = await usecase.execute();
        console.log("ComparePage data:", res); // ✅ Debug log
        setData(res || []);
      } catch (err: any) {
        console.error("ComparePage error:", err); // ✅ Log errors
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading comparison data...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!data || data.length === 0) return <p>No comparison data available.</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Compare Routes</h2>

      <table className="min-w-full border border-gray-300 text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Route ID</th>
            <th className="border p-2">Baseline</th>
            <th className="border p-2">Comparison</th>
            <th className="border p-2">% Difference</th>
            <th className="border p-2">Compliant</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => (
            <tr key={r.routeId}>
              <td className="border p-1">{r.routeId}</td>
              <td className="border p-1">{r.baseline?.toFixed?.(2) ?? "N/A"}</td>
              <td className="border p-1">{r.comparison?.toFixed?.(2) ?? "N/A"}</td>
              <td className="border p-1">
                {r.percentDiff !== undefined
                  ? `${r.percentDiff.toFixed(2)}%`
                  : "N/A"}
              </td>
              <td className="border p-1">
                {r.compliant ? "✅" : "❌"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
