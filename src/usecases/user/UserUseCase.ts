import { UserRequest, UserUpdateRequest } from "@/domain/dto/User";
import { Hasher } from "@/domain/repositories/Hasher";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { ValidationError } from "@/lib/http/error";

export class UserUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly hasher: Hasher
  ) {}

  async register(req: UserRequest) {
    if (!req.name?.trim()) {
      throw new ValidationError("Name is required");
    }

    if (!req.email?.trim()) {
      throw new ValidationError("Email is required");
    }

    if (!req.username?.trim()) {
      throw new ValidationError("Username is required");
    }

    if (!req.password?.trim()) {
      throw new ValidationError("Password is required");
    }

    if (!req.verifyPassword?.trim()) {
      throw new ValidationError("Verify Password is required");
    }

    if (req.password !== req.verifyPassword) {
      throw new ValidationError("Password doesn't match");
    }

    req.password = await this.hasher.hash(req.password);
    return await this.userRepo.register(req);
  }

  async getAll() {
    return await this.userRepo.getAll();
  }

  async getByid(id: string) {
    return await this.userRepo.getById(id);
  }

  async getByUsername(username: string) {
    return await this.userRepo.getByUsername(username);
  }

  async update(id: string, req: UserUpdateRequest) {
    return await this.userRepo.update(id, req);
  }

  async delete(id: string) {
    await this.userRepo.delete(id);
  }
}
