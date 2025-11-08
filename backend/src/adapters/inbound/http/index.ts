import { Express } from "express";
import { routesRouter } from "./routesController";

export function registerHttpRoutes(app: Express) {
  app.use("/routes", routesRouter);
}
