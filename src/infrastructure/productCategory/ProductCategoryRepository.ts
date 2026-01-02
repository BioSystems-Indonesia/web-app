import { ProductCategoryRequest } from "@/domain/dto/ProductCategory";

import { prisma } from "../prisma/PrismaClient";
import { NotFoundError, ValidationError } from "@/lib/http/error";
import { ProductCategory } from "@/domain/entities/ProductCategory";
import { ProductCategoryRepository } from "@/domain/repositories/ProductCategoryRepository";
import { ProductType } from "@prisma/client";

export class ProductCategoryRepositoryPrisma implements ProductCategoryRepository {
  async create(req: ProductCategoryRequest): Promise<ProductCategory> {
    const exists = await prisma.productCategory.findUnique({
      where: { category: req.category },
    });

    if (exists) {
      throw new ValidationError("Product category already exists");
    }

    const categoryType =
      req.categorType.toLowerCase() === "clinical"
        ? ProductType.CLINICAL
        : ProductType.FOOD_AND_BEVERAGE;

    const category = await prisma.productCategory.create({
      data: {
        category: req.category,
        categoryType: categoryType,
        icon: req.icon,
      },
    });

    return new ProductCategory(
      category.id,
      category.category,
      category.categoryType,
      category.icon
    );
  }

  async getById(id: number): Promise<ProductCategory> {
    const category = await prisma.productCategory.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!category) {
      throw new NotFoundError(`Product Category ${id} not found`);
    }

    return new ProductCategory(
      category.id,
      category.category,
      category.categoryType,
      category.icon
    );
  }

  async getAll(): Promise<ProductCategory[]> {
    const categories = await prisma.productCategory.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: { category: "asc" },
    });

    return categories.map((c) => new ProductCategory(c.id, c.category, c.categoryType, c.icon));
  }

  async getByProductType(productType: ProductType): Promise<ProductCategory[]> {
    const categories = await prisma.productCategory.findMany({
      where: {
        deletedAt: null,
        categoryType: productType,
      },
    });

    return categories.map((c) => new ProductCategory(c.id, c.category, c.categoryType, c.icon));
  }

  async update(id: number, req: ProductCategoryRequest): Promise<ProductCategory> {
    const exists = await prisma.productCategory.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
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

    return new ProductCategory(
      category.id,
      category.category,
      category.categoryType,
      category.icon
    );
  }

  async delete(id: number): Promise<void> {
    const exists = await prisma.productCategory.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!exists) {
      throw new NotFoundError(`Product Category ${id} not found`);
    }

    await prisma.productCategory.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
