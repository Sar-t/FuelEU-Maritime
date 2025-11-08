import { api } from "./apiClient";
import { type IPoolingService } from "../../core/ports/IPoolingService";
import { type Pool } from "../../core/domain/Pool";

/**
 * PoolingServiceAPI
 * -----------------
 * Outbound adapter implementing the IPoolingService interface.
 * Communicates with backend /pools endpoints to create and manage pools.
 */
export class PoolingServiceAPI implements IPoolingService {
  async createPool(pool: Pool): Promise<any> {
    const res = await api.post("/pools", pool);
    return res.data;
  }
}
