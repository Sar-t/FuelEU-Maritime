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

describe("⚖️ /compliance API", () => {
  test("GET /compliance/cb should compute and persist CBs", async () => {
    const res = await request(app).get("/compliance/cb?year=2025");
    expect(res.status).toBe(200);
    expect(res.body.results.length).toBeGreaterThan(0);
  });

  test("GET /compliance/adjusted-cb should return stored CBs", async () => {
    const res = await request(app).get("/compliance/adjusted-cb?year=2025");
    expect(res.status).toBe(200);
    expect(res.body.results.length).toBeGreaterThan(0);
  });
});
