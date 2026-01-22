export class KPIAudit {
  constructor(
    public id: string,
    public auditorId: string,
    public kpiId: string,
    public notes: string | null,
    public score: number | null,
    public auditedAt: Date
  ) {}
}
