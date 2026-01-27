import { InventoryRepository } from "@/domain/repositories/InventoryRepository";
import { Inventory, InventoryHandover } from "@prisma/client";
import { prisma } from "../prisma/PrismaClient";
import { InventoryRequest } from "@/domain/dto/Inventory";
import { InventoryHandoverRequest } from "@/domain/dto/InventoryHandover";
import { BadRequestError, NotFoundError } from "@/lib/http/error";

export class InventoryRepositoryPrisma implements InventoryRepository {
  async create(req: InventoryRequest): Promise<Inventory> {
    const categoryExists = await prisma.inventoryCategory.count({
      where: { id: req.categoryId, deletedAt: null },
    });
    if (categoryExists === 0) throw new NotFoundError(`Category ${req.categoryId} not found`);

    const existing = await prisma.inventory.count({
      where: { assetCode: req.assetCode, deletedAt: null },
    });
    if (existing > 0) throw new BadRequestError("Inventory assetCode already exists");

    const inventory = await prisma.inventory.create({
      data: {
        assetCode: req.assetCode,
        assetType: req.assetType,
        status: req.status ?? undefined,
        category: { connect: { id: req.categoryId } },
      },
    });

    return inventory;
  }

  async getById(id: string): Promise<Inventory> {
    const inventory = await prisma.inventory.findFirst({
      where: { id, deletedAt: null },
      include: {
        category: {
          select: {
            id: true,
            code: true,
            name: true,
          },
        },
        handovers: {
          select: {
            handoverDate: true,
            conditionNotes: true,
            signatureFile: true,
            employee: {
              select: {
                id: true,
                fullName: true,
              },
            },
          },
        },
      },
    });
    if (!inventory) throw new NotFoundError(`Inventory ${id} not found`);
    return inventory;
  }

  async getAll(): Promise<Inventory[]> {
    return await prisma.inventory.findMany({
      where: { deletedAt: null },
      include: {
        category: true,
      },
    });
  }

  async update(id: string, req: InventoryRequest): Promise<Inventory> {
    const exists = await prisma.inventory.findFirst({ where: { id, deletedAt: null } });
    if (!exists) throw new NotFoundError(`Inventory ${id} not found`);

    const codeCount = await prisma.inventory.count({
      where: { assetCode: req.assetCode, id: { not: id }, deletedAt: null },
    });
    if (codeCount > 0) throw new BadRequestError("Inventory assetCode already exists");

    const categoryExists = await prisma.inventoryCategory.count({
      where: { id: req.categoryId, deletedAt: null },
    });
    if (categoryExists === 0) throw new NotFoundError(`Category ${req.categoryId} not found`);

    const inventory = await prisma.inventory.update({
      where: { id, deletedAt: null },
      data: {
        assetCode: req.assetCode,
        assetType: req.assetType,
        status: req.status ?? undefined,
        category: { connect: { id: req.categoryId } },
      },
    });

    return inventory;
  }

  async deleteById(id: string): Promise<void> {
    const exists = await prisma.inventory.findFirst({ where: { id, deletedAt: null } });
    if (!exists) throw new NotFoundError(`Inventory ${id} not found`);

    await prisma.inventory.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  async createHandover(req: InventoryHandoverRequest): Promise<InventoryHandover> {
    const inventory = await prisma.inventory.findFirst({
      where: { id: req.inventoryId, deletedAt: null },
    });
    if (!inventory) throw new NotFoundError(`Inventory ${req.inventoryId} not found`);

    const employeeExists = await prisma.employee.count({
      where: { id: req.employeeId, deletedAt: null },
    });
    if (employeeExists === 0) throw new NotFoundError(`Employee ${req.employeeId} not found`);

    // Prevent multiple active handovers for same inventory
    const activeCount = await prisma.inventoryHandover.count({
      where: { inventoryId: req.inventoryId, returnedAt: null },
    });
    if (activeCount > 0) throw new Error("Inventory already handed over and not returned");

    const handover = await prisma.inventoryHandover.create({
      data: {
        employee: { connect: { id: req.employeeId } },
        inventory: { connect: { id: req.inventoryId } },
        handoverDate: req.handoverDate,
        conditionNotes: req.conditionNotes,
        signatureFile: req.signatureFile,
      },
    });

    return handover;
  }

  async returnHandover(handoverId: string): Promise<InventoryHandover> {
    const exists = await prisma.inventoryHandover.findFirst({ where: { id: handoverId } });
    if (!exists) throw new NotFoundError(`Handover ${handoverId} not found`);
    if (exists.returnedAt) throw new Error("Handover already returned");

    const updated = await prisma.inventoryHandover.update({
      where: { id: handoverId, deletedAt: null },
      data: { returnedAt: new Date() },
    });
    return updated;
  }

  async getHandoversByEmployee(employeeId: string): Promise<InventoryHandover[]> {
    return await prisma.inventoryHandover.findMany({
      where: { employeeId, deletedAt: null },
      orderBy: { handoverDate: "desc" },
    });
  }

  async getActiveHandoverByInventory(inventoryId: string): Promise<InventoryHandover | null> {
    return await prisma.inventoryHandover.findFirst({ where: { inventoryId, returnedAt: null } });
  }
}
