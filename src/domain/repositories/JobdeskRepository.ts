import { Jobdesk, EmployeeJobdesk } from "@prisma/client";
import { JobdeskRequest } from "../dto/Jobdesk";
import { EmployeeJobdeskRequest } from "../dto/EmployeeJobdesk";

export interface JobdeskRepository {
  create(req: JobdeskRequest): Promise<Jobdesk>;
  getById(id: string): Promise<Jobdesk>;
  getAll(): Promise<Jobdesk[]>;
  update(id: string, req: JobdeskRequest): Promise<Jobdesk>;
  deleteById(id: string): Promise<void>;

  assignToEmployee(req: EmployeeJobdeskRequest): Promise<EmployeeJobdesk>;
  unassignEmployee(assignmentId: string): Promise<void>;
  getJobdesksByPosition(positionId: string): Promise<Jobdesk[]>;
  getJobdesksByEmployee(employeeId: string): Promise<EmployeeJobdesk[]>;
}
