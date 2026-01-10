import { UserRequest } from "@/domain/dto/User";
import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { prisma } from "../prisma/PrismaClient";
import { NotFoundError } from "@/lib/http/error";

export class UserRepositoryPrisma implements UserRepository {
  async register(req: UserRequest): Promise<User> {
    const existingEmail = await prisma.user.count({
      where: { email: req.email },
    });

    const existingUsername = await prisma.authentication.count({
      where: { username: req.username },
    });

    if (existingEmail > 0) {
      throw new Error("User with this email already exists");
    }

    if (existingUsername > 0) {
      throw new Error("Username already exists");
    }

    const user = await prisma.user.create({
      data: {
        name: req.name,
        email: req.email,
        role: {
          connect: {
            name: req.role,
          },
        },
        auth: {
          create: {
            username: req.username,
            password: req.password,
          },
        },
      },
      include: {
        auth: {
          select: {
            username: true,
          },
        },
        role: true,
      },
    });

    return new User(
      user.id,
      user.email,
      user.name ?? "",
      user.role?.name ?? req.role,
      user.auth?.username ?? "",
      user.createdAt,
      user.updatedAt
    );
  }

  async getAll(): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        auth: {
          select: {
            username: true,
          },
        },
        role: true,
      },
    });

    return users.map(
      (user) =>
        new User(
          user.id,
          user.email,
          user.name ?? "",
          user.role?.name ?? "ADMIN",
          user.auth?.username ?? "",
          user.createdAt,
          user.updatedAt
        )
    );
  }

  async getById(id: string): Promise<User> {
    const user = await prisma.user.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
      include: {
        role: true,
        auth: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundError(`User ${id} not found`);
    }

    return new User(
      user.id,
      user.email,
      user.name ?? "",
      user.role?.name ?? "ADMIN",
      user.auth?.username ?? "",
      user.createdAt,
      user.updatedAt
    );
  }

  async getByUsername(username: string): Promise<User> {
    const auth = await prisma.authentication.findFirst({
      where: {
        username: username,
        deletedAt: null,
      },
      include: {
        user: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!auth || !auth.user) {
      throw new NotFoundError(`User with username ${username} not found`);
    }

    return new User(
      auth.user.id,
      auth.user.email,
      auth.user.name ?? "",
      auth.user.role?.name ?? "ADMIN",
      auth.username,
      auth.user.createdAt,
      auth.user.updatedAt
    );
  }

  async update(id: string, req: UserRequest): Promise<User> {
    const exists = await prisma.user.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!exists) {
      throw new NotFoundError(`User ${id} not found`);
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        name: req.name,
        email: req.email,
        role: {
          connect: {
            name: req.role,
          },
        },
      },
      include: {
        auth: {
          select: {
            username: true,
          },
        },
        role: true,
      },
    });

    return new User(
      user.id,
      user.email,
      user.name ?? "",
      user.role?.name ?? req.role,
      user.auth?.username ?? "",
      user.createdAt,
      user.updatedAt
    );
  }

  async delete(id: string): Promise<void> {
    const exists = await prisma.user.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!exists) {
      throw new NotFoundError(`User ${id} not found`);
    }

    await prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        auth: {
          update: {
            deletedAt: new Date(),
          },
        },
      },
    });
  }
}
