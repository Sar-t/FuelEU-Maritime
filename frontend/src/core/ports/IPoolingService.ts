import type { Pool } from "../domain/Pool";

export interface IPoolingService {
  createPool(pool: Pool): Promise<any>;
}
