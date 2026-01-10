import { UserRole } from "@prisma/client";

export class User {
  constructor(
    public id: string,
    public email: string,
    public name: string,
    public role: UserRole,
    public username: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
