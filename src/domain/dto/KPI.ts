export interface KPIRequest {
  employeeId: string;
  period: string;
  documentFile: string;
  description?: string | null;
}
