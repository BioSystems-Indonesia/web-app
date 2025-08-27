import jwt from "jsonwebtoken";
import { env } from "process";

const SECRET_KEY = env.SECRET_KEY || "";

export interface claims {
  userId: string;
  username: string;
  role: string;
}

export function generateToken(payload: claims) {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: "24h",
  });
}

export function validateToken(token: string) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return {
      valid: true,
      payload: decoded,
    };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : "Token invalid",
    };
  }
}
