// lib/hash/BcryptHasher.ts
import * as bcrypt from "bcrypt";
import { Hasher } from "@/domain/security/Hasher";

export class PasswordHasher implements Hasher {
  constructor(private readonly saltRounds = 10) {}

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(password, hashed);
  }
}
