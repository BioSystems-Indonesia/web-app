import { JobdeskRequest } from "@/domain/dto/Jobdesk";
import { JobdeskRepository } from "@/domain/repositories/JobdeskRepository";
import { validateJobdesk } from "@/validation/jobdesk.validator";

export class JobdeskUseCase {
  constructor(private readonly repo: JobdeskRepository) {}

  async create(req: JobdeskRequest) {
    const validated = validateJobdesk(req);
    return await this.repo.create(validated);
  }

  async getById(id: string) {
    return await this.repo.getById(id);
  }

  async getAll() {
    return await this.repo.getAll();
  }

  async update(id: string, req: JobdeskRequest) {
    const validated = validateJobdesk(req);
    return await this.repo.update(id, validated);
  }

  async deleteById(id: string) {
    return await this.repo.deleteById(id);
  }

  async getJobdesksByPosition(positionId: string) {
    return await this.repo.getJobdesksByPosition(positionId);
  }

  async getJobdesksByEmployee(employeeId: string) {
    return await this.repo.getJobdesksByEmployee(employeeId);
  }
}
