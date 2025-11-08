import { useState } from "react";
import { BankingServiceAPI } from "../../infrastructure/BankingServiceAPI";
import DashboardLayout from "../components/DashboardLayout";

export default function BankingPage() {
  const [shipId, setShipId] = useState("S001");
  const [year, setYear] = useState(2025);
  const [data, setData] = useState<any>(null);
  const [message, setMessage] = useState("");
  const bankingService = new BankingServiceAPI();

  const fetchRecords = async () => {
    const res = await bankingService.getBankedRecords(shipId, year);
    setData(res);
  };

  const handleBank = async () => {
    const res = await bankingService.bankSurplus(shipId, year);
    setMessage(res.message);
    fetchRecords();
  };

  const handleApply = async () => {
    const res = await bankingService.applyBanked(shipId, year, 100);
    setMessage(res.message);
    fetchRecords();
  };

  return (
    <DashboardLayout title="Banking Compliance Balance">
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          value={shipId}
          onChange={(e) => setShipId(e.target.value)}
          placeholder="Ship ID"
          className="border p-2 rounded-md w-32 shadow-sm"
        />
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          placeholder="Year"
          className="border p-2 rounded-md w-32 shadow-sm"
        />
        <button
          onClick={fetchRecords}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded-md"
        >
          Load Records
        </button>
      </div>

      {data && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 text-blue-800">
          <p>
            <strong>Total Banked:</strong> {data.total_banked ?? "0"}
          </p>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={handleBank}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md"
        >
          Bank Surplus
        </button>
        <button
          onClick={handleApply}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md"
        >
          Apply Banked Surplus
        </button>
      </div>

      {message && (
        <p className="mt-4 text-green-700 bg-green-50 border border-green-200 p-2 rounded-lg">
          {message}
        </p>
      )}
    </DashboardLayout>
  );
}
