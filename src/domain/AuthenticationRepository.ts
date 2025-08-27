import { Authentication } from "./Authentication";

export interface AuthenticationRepository {
  findByUsername(username: string): Promise<Authentication>;
}
