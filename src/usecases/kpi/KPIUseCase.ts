import { KPIRequest } from "@/domain/dto/KPI";
import { KPIAuditRequest } from "@/domain/dto/KPIAudit";
import { KPIRepository } from "@/domain/repositories/KPIRepository";
import { validateKPI, validateKPIAudit } from "@/validation/kpi.validator";

export class KPIUseCase {
  constructor(private readonly repo: KPIRepository) {}

  async create(req: KPIRequest) {
    const validated = validateKPI(req);
    return await this.repo.create(validated);
  }

  async getById(id: string) {
    return await this.repo.getById(id);
  }

  async getAll() {
    return await this.repo.getAll();
  }

  async update(id: string, req: KPIRequest) {
    const validated = validateKPI(req);
    return await this.repo.update(id, validated);
  }

  async deleteById(id: string) {
    return await this.repo.deleteById(id);
  }

  async addAudit(req: KPIAuditRequest) {
    const validated = validateKPIAudit(req);
    return await this.repo.addAudit(validated);
  }

  async getAuditsByKpi(kpiId: string) {
    return await this.repo.getAuditsByKpi(kpiId);
  }

  async getAuditsByAuditor(auditorId: string) {
    return await this.repo.getAuditsByAuditor(auditorId);
  }
}
