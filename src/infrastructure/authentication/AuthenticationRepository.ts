import { AuthenticationRepository } from "@/domain/repositories/AuthenticationRepository";
import { prisma } from "../prisma/PrismaClient";
import { Authentication } from "@/domain/entities/Authentication";
import { AuthenticationError, NotFoundError } from "@/lib/http/error";

export class AuthenticationRepositoryPrisma implements AuthenticationRepository {
  async findByUsername(username: string): Promise<Authentication> {
    const auth = await prisma.authentication.findFirst({
      where: { username, deletedAt: null },
      include: {
        user: {
          select: {
            id: true,
            roleId: true,
          },
        },
      },
    });

    if (!auth || !auth.user) {
      throw new AuthenticationError();
    }

    let roleName: string | undefined = undefined;
    if (auth.user.roleId) {
      const role = await prisma.role.findFirst({
        where: { id: auth.user.roleId, deletedAt: null },
        select: { name: true },
      });
      roleName = role?.name ?? undefined;
    }
    return new Authentication(auth.user.id, auth.username, auth.password, roleName);
  }

  async updatePassword(username: string, newPassword: string): Promise<void> {
    const auth = await prisma.authentication.findFirst({
      where: {
        username: username,
        deletedAt: null,
      },
    });

    if (!auth) {
      throw new NotFoundError(`Authentication for user ${username} not found`);
    }

    await prisma.authentication.update({
      where: {
        username: username,
      },
      data: {
        password: newPassword,
      },
    });
  }
}
