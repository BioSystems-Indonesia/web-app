import { AuthenticationRepository } from "@/domain/AuthenticationRepository";
import { Hasher } from "@/domain/security/Hasher";
import { JwtService, Claims } from "@/lib/helper/JwtService";

export class AuthenticationUseCase {
  constructor(
    private authRepo: AuthenticationRepository,
    private hasher: Hasher,
    private jwt: JwtService
  ) {}

  async login(username: string, password: string) {
    const userAuth = await this.authRepo.findByUsername(username);

    const isValid = await this.hasher.compare(password, userAuth.password);
    if (!isValid) {
      throw new Error("username or password is wrong!");
    }

    const payload: Claims = {
      userId: userAuth.id,
      username: userAuth.username,
      role: userAuth.role,
    };

    return {
      id: userAuth.id,
      token: this.jwt.generate(payload),
    };
  }

  async tokenVerify(token: string) {
    if (!token) {
      throw new Error("invalid token");
    }

    const result = this.jwt.validate(token);
    if (!result.valid) {
      throw new Error(result.error ?? "invalid token");
    }

    return result.payload;
  }
}
