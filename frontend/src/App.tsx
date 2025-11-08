import { useState } from "react";
import RoutesPage from "./adapters/ui/pages/RoutesPage";
import ComparePage from "./adapters/ui/pages/ComparePage";
import BankingPage from "./adapters/ui/pages/BankingPage";
import PoolingPage from "./adapters/ui/pages/PoolingPage";

export default function App() {
  const [tab, setTab] = useState("routes");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-blue-700 text-white py-4 shadow">
        <h1 className="text-2xl font-bold text-center">
          FuelEU Compliance Dashboard
        </h1>
        <nav className="flex justify-center mt-3 space-x-6">
          {["routes", "compare", "banking", "pooling"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-md ${
                tab === t ? "bg-blue-500" : "bg-blue-800 hover:bg-blue-600"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </nav>
      </header>

      <main className="p-6">
        {tab === "routes" && <RoutesPage />}
        {tab === "compare" && <ComparePage />}
        {tab === "banking" && <BankingPage />}
        {tab === "pooling" && <PoolingPage />}
      </main>
    </div>
  );
}
