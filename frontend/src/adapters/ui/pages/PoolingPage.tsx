import { useState } from "react";
import { PoolingServiceAPI } from "../../infrastructure/PoolingServiceAPI";
import { type Pool } from "../../../core/domain/Pool";
import DashboardLayout from "../components/DashboardLayout";

export default function PoolingPage() {
  const [year, setYear] = useState(2025);
  const [result, setResult] = useState<any>(null);

  const [members, setMembers] = useState([
    { shipId: "S001", cb_before: 50000 },
    { shipId: "S002", cb_before: -30000 },
  ]);

  const poolingService = new PoolingServiceAPI();

  const createPool = async () => {
    const pool: Pool = { year, members };
    const res = await poolingService.createPool(pool);
    setResult(res);
  };

  return (
    <DashboardLayout title="Pooling Ships">
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          placeholder="Year"
          className="border p-2 rounded-md w-32 shadow-sm"
        />
        <button
          onClick={createPool}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md"
        >
          Create Pool
        </button>
      </div>

      {result && (
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <h3 className="font-semibold text-blue-700 mb-3">Pool Members</h3>
          <table className="min-w-full border border-gray-200 rounded-xl text-center">
            <thead className="bg-blue-50 text-blue-800">
              <tr>
                <th className="p-3 border">Ship ID</th>
                <th className="p-3 border">Before</th>
                <th className="p-3 border">After</th>
              </tr>
            </thead>
            <tbody>
              {result.members.map((m: any) => (
                <tr key={m.shipId} className="hover:bg-blue-50 transition-all duration-200">
                  <td className="p-2 border">{m.shipId}</td>
                  <td className="p-2 border">{m.cb_before}</td>
                  <td className="p-2 border">{m.cb_after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}
