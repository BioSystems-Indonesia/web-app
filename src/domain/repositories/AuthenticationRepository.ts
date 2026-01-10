import { Authentication } from "../entities/Authentication";

export interface AuthenticationRepository {
  findByUsername(username: string): Promise<Authentication>;
  updatePassword(username: string, newPassword: string): Promise<void>;
}
