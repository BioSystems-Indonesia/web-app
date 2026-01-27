import { Jobdesk } from "@prisma/client";
import { JobdeskRequest } from "../dto/Jobdesk";

export interface JobdeskRepository {
  create(req: JobdeskRequest): Promise<Jobdesk>;
  getById(id: string): Promise<Jobdesk>;
  getAll(): Promise<Jobdesk[]>;
  update(id: string, req: JobdeskRequest): Promise<Jobdesk>;
  deleteById(id: string): Promise<void>;

  getJobdesksByPosition(positionId: string): Promise<Jobdesk[]>;
  getJobdesksByEmployee(employeeId: string): Promise<Jobdesk[]>;
}
