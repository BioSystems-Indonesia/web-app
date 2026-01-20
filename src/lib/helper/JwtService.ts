import { Claims } from "@/domain/dto/Authentication";
import jwt, { Secret, SignOptions } from "jsonwebtoken";

export class JwtService {
  private readonly secretKey: Secret;
  private readonly options: SignOptions;

  constructor(secretKey: string, expiresIn: SignOptions["expiresIn"] = "24h") {
    this.secretKey = secretKey as Secret;
    this.options = { expiresIn };
  }

  generate(payload: Claims): string {
    console.log(payload);
    return jwt.sign(payload, this.secretKey, this.options);
  }

  validate(token: string): { valid: boolean; payload?: Claims; error?: string } {
    try {
      const decoded = jwt.verify(token, this.secretKey) as Claims;
      return { valid: true, payload: decoded };
    } catch (error) {
      return {
        valid: false,
        error: error instanceof Error ? error.message : "Token invalid",
      };
    }
  }
}
