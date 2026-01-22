import { Position } from "@prisma/client";
import { PositionRequest } from "../dto/Position";

export interface PositionRepository {
  create(req: PositionRequest): Promise<Position>;
  getById(id: string): Promise<Position>;
  getAll(): Promise<Position[]>;
  update(id: string, req: PositionRequest): Promise<Position>;
  deleteById(id: string): Promise<void>;
}
