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

describe("Routes API", () => {
  test("GET /routes returns seeded routes", async () => {
    const res = await request(app).get("/routes");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("POST /routes/:id/baseline sets baseline", async () => {
    const res = await request(app).post("/routes/R001/baseline");
    expect(res.status).toBe(200);
    expect(res.body.message).toContain("Baseline set");
  });

  test("GET /routes/comparison returns comparison data", async () => {
    const res = await request(app).get("/routes/comparison");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
