import { PositionRepository } from "@/domain/repositories/PositionRepository";
import { Position } from "@prisma/client";
import { prisma } from "../prisma/PrismaClient";
import { PositionRequest } from "@/domain/dto/Position";
import { NotFoundError } from "@/lib/http/error";

export class PositionRepositoryPrisma implements PositionRepository {
  async create(req: PositionRequest): Promise<Position> {
    const existing = await prisma.position.count({
      where: { code: req.code, deletedAt: null },
    });

    if (existing > 0) {
      throw new Error("Position code already exists");
    }

    const position = await prisma.position.create({
      data: {
        code: req.code,
        name: req.name,
        description: req.description ?? null,
      },
    });

    return position;
  }

  async getById(id: string): Promise<Position> {
    const position = await prisma.position.findFirst({
      where: { id, deletedAt: null },
    });

    if (!position) {
      throw new NotFoundError(`Position ${id} not found`);
    }

    return position;
  }

  async getAll(): Promise<Position[]> {
    const positions = await prisma.position.findMany({
      where: { deletedAt: null },
      include: {
        jobdesks: true,
        employees: {
          select: {
            id: true,
            fullName: true,
          },
        },
      },
    });

    return positions;
  }

  async update(id: string, req: PositionRequest): Promise<Position> {
    const exists = await prisma.position.findFirst({
      where: { id, deletedAt: null },
    });

    if (!exists) {
      throw new NotFoundError(`Position ${id} not found`);
    }

    const codeCount = await prisma.position.count({
      where: { code: req.code, id: { not: id }, deletedAt: null },
    });

    if (codeCount > 0) throw new Error("Position code already exists");

    const position = await prisma.position.update({
      where: { id },
      data: {
        code: req.code,
        name: req.name,
        description: req.description ?? null,
      },
    });

    return position;
  }

  async deleteById(id: string): Promise<void> {
    const exists = await prisma.position.findFirst({
      where: { id, deletedAt: null },
    });

    if (!exists) {
      throw new NotFoundError(`Position ${id} not found`);
    }

    await prisma.position.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
