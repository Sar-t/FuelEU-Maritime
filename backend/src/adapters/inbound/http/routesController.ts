import { Request, Response, Router } from "express";
import { PgRouteRepo } from "../../outbound/postgres/routeRepo";
import { compareRoutes } from "../../../core/application/computeComparison";

const router = Router();
const routeRepo = new PgRouteRepo();

// ✅ GET /routes → list all routes
router.get("/", async (_req: Request, res: Response) => {
  try {
    const routes = await routeRepo.findAll();
    res.json(routes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch routes", details: (err as Error).message });
  }
});

// ✅ POST /routes/:routeId/baseline → set a route as baseline
router.post("/:routeId/baseline", async (req: Request, res: Response) => {
  const { routeId } = req.params;
  try {
    await routeRepo.setBaseline(routeId!);
    res.json({ message: `Baseline set for ${routeId}` });
  } catch (err) {
    res.status(500).json({ error: "Failed to set baseline", details: (err as Error).message });
  }
});

// ✅ GET /routes/comparison → compare baseline vs other routes
router.get("/comparison", async (_req: Request, res: Response) => {
  try {
    const baseline = await routeRepo.findBaseline();
    if (!baseline) return res.status(400).json({ error: "No baseline route set" });
    const others = await routeRepo.findOthers(baseline.routeId, baseline.year);
    const result = compareRoutes(baseline, others);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to compare routes", details: (err as Error).message });
  }
});

export const routesRouter = router;
