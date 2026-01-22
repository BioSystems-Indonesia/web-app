export interface PerformanceAuditRequest {
  auditorId: string;
  reviewId: string;
  notes?: string | null;
  approved?: boolean;
}
