// src/debug/quick-db-check.ts
import { PgRouteRepo } from "../adapters/outbound/postgres/routeRepo";
import { PgBankingRepo } from "../adapters/outbound/postgres/bankingRepo";

(async () => {
  const rrepo = new PgRouteRepo();
  const brepo = new PgBankingRepo();

  console.log("All routes:");
  console.log(await rrepo.findAll());

  console.log("Baseline:");
  console.log(await rrepo.findBaseline());

  console.log("Banked amount for R001 (expect 0):");
  console.log(await brepo.getBankedAmount("R001", 2024));

  process.exit(0);
})();
