import { useState } from "react";
import { BankingServiceAPI } from "../../infrastructure/BankingServiceAPI";

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
    <div>
      <h2 className="text-xl font-semibold mb-4">Banking</h2>
      <div className="space-x-3 mb-4">
        <input
          type="text"
          value={shipId}
          onChange={(e) => setShipId(e.target.value)}
          className="border p-2"
          placeholder="Ship ID"
        />
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border p-2"
          placeholder="Year"
        />
        <button
          onClick={fetchRecords}
          className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
        >
          Load Records
        </button>
      </div>

      {data && (
        <p className="mb-2">Total Banked: <strong>{data.total_banked}</strong></p>
      )}

      <div className="space-x-4">
        <button
          onClick={handleBank}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Bank Surplus
        </button>
        <button
          onClick={handleApply}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Apply Banked Surplus
        </button>
      </div>

      {message && <p className="mt-3 text-blue-700">{message}</p>}
    </div>
  );
}
