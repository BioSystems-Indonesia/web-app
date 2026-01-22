import { PerformanceReview, PerformanceAudit } from "@prisma/client";
import { PerformanceReviewRequest } from "../dto/PerformanceReview";
import { PerformanceAuditRequest } from "../dto/PerformanceAudit";

export interface PerformanceRepository {
  create(req: PerformanceReviewRequest): Promise<PerformanceReview>;
  getById(id: string): Promise<PerformanceReview>;
  getAll(): Promise<PerformanceReview[]>;
  update(id: string, req: PerformanceReviewRequest): Promise<PerformanceReview>;
  deleteById(id: string): Promise<void>;

  addAudit(req: PerformanceAuditRequest): Promise<PerformanceAudit>;
  getAuditsByReview(reviewId: string): Promise<PerformanceAudit[]>;
  getAuditsByAuditor(auditorId: string): Promise<PerformanceAudit[]>;
}
