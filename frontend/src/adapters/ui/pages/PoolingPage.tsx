import { useState } from "react";
import { PoolingServiceAPI } from "../../infrastructure/PoolingServiceAPI";
import { type Pool } from "../../../core/domain/Pool";

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
    <div>
      <h2 className="text-xl font-semibold mb-4">Pooling</h2>
      <button
        onClick={createPool}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Pool
      </button>

      {result && (
        <div className="mt-4">
          <h3 className="font-semibold">Pool Created</h3>
          <table className="min-w-full border border-gray-300 mt-3 text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Ship ID</th>
                <th className="border p-2">Before</th>
                <th className="border p-2">After</th>
              </tr>
            </thead>
            <tbody>
              {result.members.map((m: any) => (
                <tr key={m.shipId}>
                  <td className="border p-1">{m.shipId}</td>
                  <td className="border p-1">{m.cb_before}</td>
                  <td className="border p-1">{m.cb_after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
