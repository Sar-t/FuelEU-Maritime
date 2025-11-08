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

describe("🧭 /routes API", () => {
  test("GET /routes should return all routes", async () => {
    const res = await request(app).get("/routes");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("POST /routes/:id/baseline should set baseline", async () => {
    const res = await request(app).post("/routes/R002/baseline");
    expect(res.status).toBe(200);
    expect(res.body.message).toContain("Baseline set for R002");
  });

  test("GET /routes/comparison should return comparison results", async () => {
    const res = await request(app).get("/routes/comparison");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
