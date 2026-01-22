import { EmployeeStatus } from "@prisma/client";

export interface EmployeeRequest {
  employeeCode: string;
  fullName: string;
  positionId: string;
  joinDate: Date;
  employeeStatus: EmployeeStatus;
  birthDate: Date;
  nationalId: string;
  salary: number;
  domicile: string;
  email: string;
  motherName: string;
  religion: string;
  bankName: string;
  bankAccount: string;
  bpjsNumber: string;
  taxNumber: string;
}
