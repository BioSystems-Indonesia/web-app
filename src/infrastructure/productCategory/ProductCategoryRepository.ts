import { ProductCategoryRequest } from "@/domain/dto/ProductCategory";
import { ProductCategoryRepository } from "@/domain/productCategory/ProductCategoryRepository";

import { prisma } from "../prisma/PrismaClient";
import { ProductCategory } from "@/domain/productCategory/ProductCategory";
import { NotFoundError, ValidationError } from "@/lib/http/error";

export class ProductCategoryRepositoryPrisma implements ProductCategoryRepository {
  async create(req: ProductCategoryRequest): Promise<ProductCategory> {
    const exists = await prisma.productCategory.findUnique({
      where: { category: req.category },
    });

    if (exists) {
      throw new ValidationError("Product category already exists");
    }

    const category = await prisma.productCategory.create({
      data: {
        category: req.category,
        icon: req.icon,
      },
    });

    return new ProductCategory(category.id, category.category, category.icon);
  }

  async getById(id: number): Promise<ProductCategory> {
    const category = await prisma.productCategory.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundError(`Product Category ${id} not found`);
    }

    return new ProductCategory(category.id, category.category, category.icon);
  }

  async getAll(): Promise<ProductCategory[]> {
    const categories = await prisma.productCategory.findMany({
      orderBy: { category: "asc" },
    });

    return categories.map((c) => new ProductCategory(c.id, c.category, c.icon));
  }

  async update(id: number, req: ProductCategoryRequest): Promise<ProductCategory> {
    const exists = await prisma.productCategory.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundError(`Product Category ${id} not found`);
    }

    const category = await prisma.productCategory.update({
      where: { id },
      data: {
        category: req.category,
        icon: req.icon,
      },
    });

    return new ProductCategory(category.id, category.category, category.icon);
  }

  async delete(id: number): Promise<void> {
    const exists = await prisma.productCategory.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundError(`Product Category ${id} not found`);
    }

    await prisma.productCategory.delete({
      where: { id },
    });
  }
}
