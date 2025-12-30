import { ProductRequest } from "@/domain/dto/Product";
import { Product } from "@/domain/product/Product";
import { ProductRepository } from "@/domain/product/ProductRepository";
import { prisma } from "../prisma/PrismaClient";
import { NotFoundError } from "@/lib/http/error";

export class ProductRepositoryPrisma implements ProductRepository {
  async create(req: ProductRequest): Promise<Product> {
    const product = await prisma.product.create({
      data: {
        name: req.name,
        method: req.method,

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

    return product;
  }

  async getById(id: number): Promise<Product> {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        productCategories: true,
        variants: true,
      },
    });

    if (!product) {
      throw new NotFoundError(`Product ${id} not found`);
    }

    return product;
  }

  async getAll(): Promise<Product[]> {
    const products = await prisma.product.findMany({
      include: {
        productCategories: true,
        variants: true,
      },
    });

    return products;
  }

  async update(id: number, req: ProductRequest): Promise<Product> {
    throw new Error("Method not implemented.");
  }

  async delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
