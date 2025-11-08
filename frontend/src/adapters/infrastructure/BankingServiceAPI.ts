import { api } from "./apiClient";
import {type IBankingService } from "../../core/ports/IBankingService";

/**
 * BankingServiceAPI
 * -----------------
 * Outbound adapter that implements the IBankingService interface.
 * Handles HTTP requests to the backend /banking endpoints.
 */
export class BankingServiceAPI implements IBankingService {
  async getBankedRecords(shipId: string, year: number): Promise<any> {
    const res = await api.get(`/banking/records?shipId=${shipId}&year=${year}`);
    return res.data;
  }

  async bankSurplus(shipId: string, year: number): Promise<any> {
    const res = await api.post("/banking/bank", { shipId, year });
    return res.data;
  }

  async applyBanked(shipId: string, year: number, amount: number): Promise<any> {
    const res = await api.post("/banking/apply", { shipId, year, amount });
    return res.data;
  }
}
