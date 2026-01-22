import { Employee } from "@prisma/client";
import { EmployeeRequest } from "../dto/Employee";

export interface EmployeeRepository {
  create(req: EmployeeRequest): Promise<Employee>;
  getById(id: string): Promise<Employee>;
  getAll(): Promise<Employee[]>;
  update(id: string, req: EmployeeRequest): Promise<Employee>;
  deleteById(id: string): Promise<void>;
}
