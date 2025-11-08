import { Request, Response, Router } from "express";
import { PgComplianceRepo } from "../../outbound/postgres/complianceRepo";

const router = Router();
const complianceRepo = new PgComplianceRepo();

/**
 * GET /compliance/cb?shipId=&year=
 * Computes and returns the compliance balance (CB) for a given ship and year.
 */
router.get("/cb", async (req: Request, res: Response) => {
  try {
    const { shipId, year } = req.query;

    if (!year) {
      return res.status(400).json({ error: "Missing required parameter: year" });
    }

    const cbData = await complianceRepo.computeComplianceBalance(
      shipId ? String(shipId) : undefined,
      Number(year)
    );

    if (!cbData || cbData.length === 0) {
      return res.status(404).json({ message: "No compliance data found" });
    }

    res.json({
      year: Number(year),
      shipId: shipId || "ALL",
      totalRecords: cbData.length,
      results: cbData,
    });
  } catch (err) {
    console.error("❌ Error in /compliance/cb:", err);
    res.status(500).json({
      error: "Failed to compute compliance balance",
      details: (err as Error).message,
    });
  }
});

/**
 * GET /compliance/adjusted-cb?shipId=&year=
 * Fetches adjusted CB values (after banking/pooling).
 */
router.get("/adjusted-cb", async (req: Request, res: Response) => {
  try {
    const { shipId, year } = req.query;

    if (!year) {
      return res.status(400).json({ error: "Missing required parameter: year" });
    }

    const adjustedCB = await complianceRepo.getAdjustedComplianceBalance(
      shipId ? String(shipId) : undefined,
      Number(year)
    );

    if (!adjustedCB || adjustedCB.length === 0) {
      return res.status(404).json({ message: "No adjusted CB data found" });
    }

    res.json({
      year: Number(year),
      shipId: shipId || "ALL",
      totalRecords: adjustedCB.length,
      results: adjustedCB,
    });
  } catch (err) {
    console.error("❌ Error in /compliance/adjusted-cb:", err);
    res.status(500).json({
      error: "Failed to retrieve adjusted compliance balance",
      details: (err as Error).message,
    });
  }
});

export const complianceRouter = router;
