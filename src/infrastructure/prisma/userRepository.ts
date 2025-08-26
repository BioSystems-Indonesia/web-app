import { prisma } from "./client";

export async function findUserByUsername(username: string) {
  const auth = await prisma.authentication.findUnique({
    where: { username },
    include: {
      user: true,
    },
  });

  if (!auth) {
    throw new Error("Username or password is wrong!");
  }

  const role = auth.user.roleId
    ? await prisma.role.findUnique({ where: { id: auth.user.roleId } })
    : null;

  return {
    authentication: auth,
    user: auth.user,
    role,
  };
}
