import { Claims, Token } from "@/domain/dto/Authentication";
import { UpdatePasswordRequest } from "@/domain/dto/User";
import { AuthenticationRepository } from "@/domain/repositories/AuthenticationRepository";
import { Hasher } from "@/domain/repositories/Hasher";
import { JwtService } from "@/lib/helper/JwtService";
import { AuthenticationError, InvalidTokenError, ValidationError } from "@/lib/http/error";

export class AuthenticationUseCase implements AuthenticationUseCase {
  constructor(
    private authRepo: AuthenticationRepository,
    private hasher: Hasher,
    private jwt: JwtService
  ) {}

  async login(username: string, password: string): Promise<Token> {
    const userAuth = await this.authRepo.findByUsername(username);

    const isValid = await this.hasher.compare(password, userAuth.password);
    if (!isValid) {
      throw new AuthenticationError();
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

  async tokenVerify(token: string): Promise<Claims> {
    if (!token) {
      throw new InvalidTokenError();
    }

    const result = this.jwt.validate(token);
    if (!result.valid || !result.payload) {
      throw new InvalidTokenError(result.error);
    }

    return result.payload;
  }

  async updatePassword(req: UpdatePasswordRequest) {
    if (req.newPassword !== req.verifyPassword) {
      throw new ValidationError("Password doesn't match");
    }
    const auth = await this.authRepo.findByUsername(req.username);
    const isValid = await this.hasher.compare(req.currentPassword, auth.password);

    if (!isValid) {
      throw new AuthenticationError();
    }

    await this.authRepo.updatePassword(req.username, req.newPassword);
  }
}
