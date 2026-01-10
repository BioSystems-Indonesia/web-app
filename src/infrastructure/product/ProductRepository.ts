import { ProductRequest } from "@/domain/dto/Product";
import { Product } from "@/domain/entities/Product";
import { ProductRepository } from "@/domain/repositories/ProductRepository";
import { prisma } from "../prisma/PrismaClient";
import { NotFoundError } from "@/lib/http/error";
import { ProductType } from "@prisma/client";

export class ProductRepositoryPrisma implements ProductRepository {
  async create(req: ProductRequest): Promise<Product> {
    const categoryType =
      req.productType.toLowerCase() === "clinical"
        ? ProductType.CLINICAL
        : ProductType.FOOD_AND_BEVERAGE;

    const count = await prisma.productCategory.count({
      where: {
        category: {
          in: req.category,
        },
        deletedAt: null,
      },
    });

    if (count !== req.category.length) {
      throw new NotFoundError("Some categories are not registered");
    }

    const product = await prisma.product.create({
      data: {
        name: req.name,
        method: req.method,
        productType: categoryType,
        productCategories: {
          connect: req.category.map((cat) => ({
            category: cat,
          })),
        },
        variants: {
          create: req.variant.map((v) => ({
            code: v.code,
            instrument: v.instrument,
            raVolume: v.raVolume,
            rbVolume: v.rbVolume,
            kitVolume: v.kitVolume,
          })),
        },
      },
      include: {
        productCategories: true,
        variants: true,
      },
    });

    return new Product(
      product.id,
      product.name,
      product.method,
      product.createdAt,
      product.variants,
      product.productCategories.map((cat) => ({
        ...cat,
        productType: cat.categoryType,
      }))
    );
  }

  async getById(id: number): Promise<Product> {
    const product = await prisma.product.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
      include: {
        productCategories: {
          where: {
            deletedAt: null,
          },
        },
        variants: {
          where: {
            deletedAt: null,
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundError(`Product ${id} not found`);
    }

    return new Product(
      product.id,
      product.name,
      product.method,
      product.createdAt,
      product.variants,
      product.productCategories.map((cat) => ({
        ...cat,
        productType: cat.categoryType,
      }))
    );
  }

  async getAll(): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        productCategories: {
          where: {
            deletedAt: null,
          },
        },
        variants: {
          where: {
            deletedAt: null,
          },
        },
      },
    });

    return products.map(
      (product) =>
        new Product(
          product.id,
          product.name,
          product.method,
          product.createdAt,
          product.variants,
          product.productCategories.map((cat) => ({
            ...cat,
            productType: cat.categoryType,
          }))
        )
    );
  }

  async getByCategoryAndType(productType: ProductType, categoryId: number): Promise<Product[]> {
    const categoryCount = await prisma.productCategory.count({
      where: {
        categoryType: productType,
        id: categoryId,
        deletedAt: null,
      },
    });

    if (categoryCount < 1) {
      throw new NotFoundError(`Category ${categoryId} not found`);
    }

    const products = await prisma.product.findMany({
      where: {
        deletedAt: null,
        productCategories: {
          some: {
            id: categoryId,
          },
        },
      },
      include: {
        productCategories: {
          where: {
            deletedAt: null,
          },
        },
        variants: {
          where: {
            deletedAt: null,
          },
        },
      },
    });

    return products.map(
      (product) =>
        new Product(
          product.id,
          product.name,
          product.method,
          product.createdAt,
          product.variants,
          product.productCategories.map((cat) => ({
            ...cat,
            productType: cat.categoryType,
          }))
        )
    );
  }

  async update(id: number, req: ProductRequest): Promise<Product> {
    const exists = await prisma.product.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
      include: { variants: true },
    });

    if (!exists) {
      throw new NotFoundError(`Product ${id} not found`);
    }

    const categoryCount = await prisma.productCategory.count({
      where: {
        AND: {
          category: {
            in: req.category,
          },
          deletedAt: null,
        },
      },
    });

    if (categoryCount !== req.category.length) {
      throw new NotFoundError("Some categories are not registered");
    }

    const existingCodes = exists.variants.map((v) => v.code);
    const incomingCodes = req.variant.map((v) => v.code);

    const variantToUpdate = req.variant.filter((v) => existingCodes.includes(v.code));
    const variantToCreate = req.variant.filter((v) => !existingCodes.includes(v.code));
    const variantToDelete = existingCodes.filter((code) => !incomingCodes.includes(code));

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: req.name,
        method: req.method,
        productCategories: {
          set: req.category.map((cat) => ({
            category: cat,
          })),
        },
        variants: {
          update: variantToUpdate.map((v) => ({
            where: { productId_code: { productId: id, code: v.code } },
            data: {
              code: v.code,
              instrument: v.instrument,
              raVolume: v.raVolume,
              rbVolume: v.rbVolume,
              kitVolume: v.kitVolume,
            },
          })),
          create: variantToCreate.map((v) => ({
            code: v.code,
            instrument: v.instrument,
            raVolume: v.raVolume,
            rbVolume: v.rbVolume,
            kitVolume: v.kitVolume,
          })),
          updateMany: {
            where: {
              code: { in: variantToDelete },
            },
            data: {
              deletedAt: new Date(),
            },
          },
        },
      },
      include: {
        productCategories: true,
        variants: true,
      },
    });

    return new Product(
      product.id,
      product.name,
      product.method,
      product.createdAt,
      product.variants,
      product.productCategories.map((cat) => ({
        ...cat,
        productType: cat.categoryType,
      }))
    );
  }

  async delete(id: number): Promise<void> {
    const exists = await prisma.product.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!exists) {
      throw new NotFoundError(`Product ${id} not found`);
    }

    await prisma.product.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    // await prisma.$transaction(async (tx) => {
    //   await tx.productVariant.deleteMany({
    //     where: { productId: id },
    //   });

    //   await tx.product.update({
    //     where: { id },
    //     data: {
    //       productCategories: {
    //         set: [],
    //       },
    //     },
    //   });

    //   await tx.product.delete({
    //     where: { id },
    //   });
    // });
  }
}
