export interface IBankingService {
  getBankedRecords(shipId: string, year: number): Promise<any>;
  bankSurplus(shipId: string, year: number): Promise<any>;
  applyBanked(shipId: string, year: number, amount: number): Promise<any>;
}
