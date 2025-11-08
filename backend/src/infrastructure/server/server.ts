import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { registerHttpRoutes } from "../../adapters/inbound/http/index";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

registerHttpRoutes(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 FuelEU backend running on port ${PORT}`);
});
