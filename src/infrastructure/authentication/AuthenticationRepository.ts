import { AuthenticationRepository } from "@/domain/repositories/AuthenticationRepository";
import { prisma } from "../prisma/PrismaClient";
import { Authentication } from "@/domain/entities/Authentication";
import { AuthenticationError, NotFoundError } from "@/lib/http/error";

export class AuthenticationRepositoryPrisma implements AuthenticationRepository {
  async findByUsername(username: string): Promise<Authentication> {
    const auth = await prisma.authentication.findUnique({
      where: { username },
      include: {
        user: {
          select: {
            id: true,
            roleId: true,
          },
        },
      },
    });

    if (!auth) {
      throw new AuthenticationError();
    }

    const role = auth.user.roleId
      ? await prisma.role.findUnique({
          where: { id: auth.user.roleId },
          select: { name: true },
        })
      : null;

    return new Authentication(auth.user.id, auth.username, auth.password, role?.name);
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
