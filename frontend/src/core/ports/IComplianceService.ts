import type { ComplianceBalance } from "../domain/Compliance";

export interface IComplianceService {
  getComplianceBalance(year: number): Promise<ComplianceBalance[]>;
  getAdjustedComplianceBalance(year: number): Promise<ComplianceBalance[]>;
}
