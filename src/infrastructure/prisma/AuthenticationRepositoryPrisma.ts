import { Authentication } from "@/domain/Authentication";
import { AuthenticationRepository } from "@/domain/AuthenticationRepository";
import { prisma } from "./PrismaClient";

export class AuthenticationRepositoryPrisma implements AuthenticationRepository {
  async findByUsername(username: string): Promise<Authentication> {
    const auth = await prisma.authentication.findUnique({
      where: { username },
      include: { user: true },
    });

    if (!auth) {
      throw new Error("username or password is wrong!");
    }

    const role = auth.user.roleId
      ? await prisma.role.findUnique({ where: { id: auth.user.roleId } })
      : null;

    return new Authentication(auth.user.id, auth.username, auth.password, role?.name);
  }
}
