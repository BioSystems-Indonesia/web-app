export class KPI {
  constructor(
    public id: string,
    public employeeId: string,
    public period: string,
    public documentFile: string,
    public description: string | null,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
