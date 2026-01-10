import { UserRole } from "@prisma/client";

export class Role {
  constructor(
    public id: string,
    public name: UserRole,
    public description: string
  ) {}
}
