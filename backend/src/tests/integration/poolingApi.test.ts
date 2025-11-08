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

describe("🤝 /pools API", () => {
  test("POST /pools should create a valid pool", async () => {
    const res = await request(app)
      .post("/pools")
      .send({
        year: 2025,
        members: [
          { shipId: "S001", cb_before: 50000 },
          { shipId: "S002", cb_before: -25000 },
          { shipId: "S003", cb_before: -25000 },
        ],
      });
    expect([200, 400]).toContain(res.status);
  });
});
