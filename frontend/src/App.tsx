import { useState } from "react";
import RoutesPage from "./adapters/ui/pages/RoutesPage";
import ComparePage from "./adapters/ui/pages/ComparePage";
import BankingPage from "./adapters/ui/pages/BankingPage";
import PoolingPage from "./adapters/ui/pages/PoolingPage";

export default function App() {
  const [tab, setTab] = useState("routes");

  const tabs = [
    { key: "routes", label: "Routes" },
    { key: "compare", label: "Compare" },
    { key: "banking", label: "Banking" },
    { key: "pooling", label: "Pooling" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-800 transition-all duration-300">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 shadow-md">
        <div className="container mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between text-white">
          <h1 className="text-3xl font-bold tracking-tight drop-shadow-sm">
            ⚓ FuelEU Maritime Compliance
          </h1>

          {/* NAVIGATION */}
          <nav className="flex flex-wrap justify-center mt-4 md:mt-0 gap-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ease-in-out 
                  ${
                    tab === t.key
                      ? "bg-white text-blue-700 shadow-lg scale-105"
                      : "bg-blue-500/30 hover:bg-blue-500/50 hover:scale-105"
                  }`}
              >
                {t.label}
                {tab === t.key && (
                  <span className="absolute inset-x-0 bottom-0 h-[3px] bg-blue-700 rounded-t-lg"></span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow container mx-auto px-6 py-10 transition-opacity duration-500 ease-in-out">
        {tab === "routes" && <RoutesPage />}
        {tab === "compare" && <ComparePage />}
        {tab === "banking" && <BankingPage />}
        {tab === "pooling" && <PoolingPage />}
      </main>

      {/* FOOTER */}
      <footer className="mt-auto py-6 text-center border-t border-gray-200 text-gray-600 text-sm bg-white/70 backdrop-blur-sm">
        © 2025 <span className="font-semibold text-blue-700">FuelEU Maritime</span> Platform. Built with ❤️ using React + TailwindCSS.
      </footer>
    </div>
  );
}
