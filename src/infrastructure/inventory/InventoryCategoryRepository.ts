import { InventoryCategoryRepository } from "@/domain/repositories/InventoryCategoryRepository";
import { InventoryCategory } from "@prisma/client";
import { prisma } from "../prisma/PrismaClient";
import { InventoryCategoryRequest } from "@/domain/dto/InventoryCategory";
import { NotFoundError } from "@/lib/http/error";

export class InventoryCategoryRepositoryPrisma implements InventoryCategoryRepository {
  async create(req: InventoryCategoryRequest): Promise<InventoryCategory> {
    const existing = await prisma.inventoryCategory.count({
      where: { code: req.code, deletedAt: null },
    });
    if (existing > 0) throw new Error("Inventory category code already exists");

    const category = await prisma.inventoryCategory.create({
      data: {
        code: req.code,
        name: req.name,
      },
    });

    return category;
  }

  async getById(id: string): Promise<InventoryCategory> {
    const category = await prisma.inventoryCategory.findFirst({
      where: { id, deletedAt: null },
      include: {
        inventories: {
          where: { deletedAt: null },
          select: { id: true, assetCode: true, assetType: true, status: true },
        },
      },
    });
    if (!category) throw new NotFoundError(`InventoryCategory ${id} not found`);
    return category;
  }

  async getAll(): Promise<InventoryCategory[]> {
    return await prisma.inventoryCategory.findMany({
      where: { deletedAt: null },
      orderBy: { name: "asc" },
    });
  }

  async update(id: string, req: InventoryCategoryRequest): Promise<InventoryCategory> {
    const exists = await prisma.inventoryCategory.findFirst({ where: { id, deletedAt: null } });
    if (!exists) throw new NotFoundError(`InventoryCategory ${id} not found`);

    const codeCount = await prisma.inventoryCategory.count({
      where: { code: req.code, id: { not: id }, deletedAt: null },
    });
    if (codeCount > 0) throw new Error("Inventory category code already exists");

    const updated = await prisma.inventoryCategory.update({
      where: { id },
      data: {
        code: req.code,
        name: req.name,
      },
    });

    return updated;
  }

  async deleteById(id: string): Promise<void> {
    const exists = await prisma.inventoryCategory.findFirst({ where: { id, deletedAt: null } });
    if (!exists) throw new NotFoundError(`InventoryCategory ${id} not found`);

    await prisma.inventoryCategory.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}
