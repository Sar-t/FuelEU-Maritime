import { Request, Response, Router } from "express";
import { PgPoolingRepo } from "../../outbound/postgres/poolingRepo";

const router = Router();
const poolingRepo = new PgPoolingRepo();

// POST /pools
router.post("/", async (req: Request, res: Response) => {
  try {
    const { members, year } = req.body;
    if (!Array.isArray(members) || !year)
      return res.status(400).json({ error: "Missing or invalid members/year" });

    const result = await poolingRepo.createPool(members, Number(year));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export const poolingRouter = router;
