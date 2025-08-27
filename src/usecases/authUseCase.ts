import { findUserByUsername } from "@/infrastructure/prisma/userRepository";
import { claims, generateToken, validateToken } from "@/lib/auth";
import { comparePassword } from "@/lib/hash";

export async function login(username: string, password: string) {
  const user = await findUserByUsername(username);
  if (!user) {
    throw new Error("username or password wrong!");
  }

  const isValid = await comparePassword(password, user.authentication.password);
  if (!isValid) {
    throw new Error("username or password wrong!");
  }

  const claims: claims = {
    username: username,
    userId: user.user.id,
    role: user.role?.name ?? "user",
  };

  return {
    id: user.authentication.id,
    token: generateToken(claims),
  };
}

export async function tokenVerify(token: string) {
  if (!token) {
    throw new Error("invalid token");
  }
  return validateToken(token);
}
