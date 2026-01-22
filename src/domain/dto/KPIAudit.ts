export interface KPIAuditRequest {
  auditorId: string;
  kpiId: string;
  notes?: string | null;
  score?: number | null;
}
