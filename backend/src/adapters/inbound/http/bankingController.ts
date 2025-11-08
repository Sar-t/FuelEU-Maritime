import { Request, Response, Router } from "express";
import { PgBankingRepo } from "../../outbound/postgres/bankingRepo";
import { PgComplianceRepo } from "../../outbound/postgres/complianceRepo";

const router = Router();
const bankingRepo = new PgBankingRepo();
const complianceRepo = new PgComplianceRepo();

// GET /banking/records?shipId=&year=
router.get("/records", async (req: Request, res: Response) => {
  try {
    const { shipId, year } = req.query;
    if (!shipId || !year)
      return res.status(400).json({ error: "Missing shipId or year" });

    const total = await bankingRepo.getBankedAmount(String(shipId), Number(year));
    res.json({ shipId, year, total_banked: total });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// POST /banking/bank
// Body: { shipId, year }
router.post("/bank", async (req: Request, res: Response) => {
  try {
    const { shipId, year } = req.body;
    if (!shipId || !year)
      return res.status(400).json({ error: "Missing shipId or year" });

    // Compute compliance balance (CB)
    const cbData = await complianceRepo.computeComplianceBalance(
      String(shipId),
      Number(year)
    );

    // Example: sum positive balances
    const totalCB = cbData.reduce(
      (sum, r) => (r.compliance_balance > 0 ? sum + r.compliance_balance : sum),
      0
    );

    if (totalCB <= 0)
      return res.status(400).json({ error: "No surplus to bank" });

    const entry = await bankingRepo.addBankEntry({
      shipId,
      year,
      amount_gco2eq: totalCB,
    });

    res.json({
      message: `Banked surplus of ${totalCB} for ship ${shipId}`,
      entry,
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// POST /banking/apply
// Body: { shipId, year, amount }
router.post("/apply", async (req: Request, res: Response) => {
  try {
    const { shipId, year, amount } = req.body;
    if (!shipId || !year || !amount)
      return res.status(400).json({ error: "Missing shipId, year, or amount" });

    const total = await bankingRepo.getBankedAmount(String(shipId), Number(year));
    if (amount > total)
      return res.status(400).json({ error: "Insufficient banked surplus" });

    await bankingRepo.decreaseBanked(String(shipId), Number(year), amount);

    res.json({
      message: `Applied ${amount} from banked surplus for ship ${shipId}`,
      remaining: total - amount,
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export const bankingRouter = router;
