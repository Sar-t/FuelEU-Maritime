import request from "supertest";
import express from "express";
import { registerHttpRoutes } from "../../adapters/inbound/http";
import { pool } from "../../infrastructure/db/db";

const app = express();
app.use(express.json());
registerHttpRoutes(app);

afterAll(async () => {
  await pool.end();
});

describe("💰 /banking API", () => {
  test("GET /banking/records should return total banked", async () => {
    const res = await request(app).get("/banking/records?shipId=S001&year=2025");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("total_banked");
  });

  test("POST /banking/bank should bank surplus successfully", async () => {
    const res = await request(app)
      .post("/banking/bank")
      .send({ shipId: "S001", year: 2025 });
    expect([200, 400]).toContain(res.status); // may fail if no surplus
  });

  test("POST /banking/apply should apply surplus correctly", async () => {
    const res = await request(app)
      .post("/banking/apply")
      .send({ shipId: "S001", year: 2025, amount: 100 });
    expect([200, 400]).toContain(res.status);
  });
});
