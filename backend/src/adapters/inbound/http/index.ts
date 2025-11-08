import { Express } from "express";
import { routesRouter } from "./routesController";
import { complianceRouter } from "./complianceController";
import { bankingRouter } from "./bankingController";
import { poolingRouter } from "./poolingController";

export function registerHttpRoutes(app: Express) {
  app.use("/routes", routesRouter);
  app.use("/compliance", complianceRouter);
  app.use("/banking", bankingRouter);
  app.use("/pools", poolingRouter);
}
