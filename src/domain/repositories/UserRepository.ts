import { UserRequest, UserUpdateRequest } from "../dto/User";
import { User } from "../entities/User";

export interface UserRepository {
  register(req: UserRequest): Promise<User>;
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User>;
  getByUsername(username: string): Promise<User>;
  update(id: string, req: UserUpdateRequest): Promise<User>;
  delete(id: string): Promise<void>;
}
