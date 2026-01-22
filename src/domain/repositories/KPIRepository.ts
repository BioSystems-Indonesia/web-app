import { KPI, KPIAudit } from "@prisma/client";
import { KPIRequest } from "../dto/KPI";
import { KPIAuditRequest } from "../dto/KPIAudit";

export interface KPIRepository {
  create(req: KPIRequest): Promise<KPI>;
  getById(id: string): Promise<KPI>;
  getAll(): Promise<KPI[]>;
  update(id: string, req: KPIRequest): Promise<KPI>;
  deleteById(id: string): Promise<void>;

  addAudit(req: KPIAuditRequest): Promise<KPIAudit>;
  getAuditsByKpi(kpiId: string): Promise<KPIAudit[]>;
  getAuditsByAuditor(auditorId: string): Promise<KPIAudit[]>;
}
