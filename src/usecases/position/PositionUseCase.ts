import { PositionRequest } from "@/domain/dto/Position";
import { PositionRepository } from "@/domain/repositories/PositionRepository";
import { validatePosition } from "@/validation/position.validator";

export class PositionUseCase {
  constructor(private readonly repo: PositionRepository) {}

  async create(req: PositionRequest) {
    const validated = validatePosition(req);
    return await this.repo.create(validated);
  }

  async getById(id: string) {
    return await this.repo.getById(id);
  }

  async getAll() {
    return await this.repo.getAll();
  }

  async update(id: string, req: PositionRequest) {
    const validated = validatePosition(req);
    return await this.repo.update(id, validated);
  }

  async deleteById(id: string) {
    return await this.repo.deleteById(id);
  }
}
