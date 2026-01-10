import { UserRole } from "@prisma/client";

export interface UserRequest {
  name: string;
  email: string;
  role: UserRole;
  username: string;
  password: string;
  verifyPassword: string;
}

export interface UpdatePasswordRequest {
  username: string;
  currentPassword: string;
  newPassword: string;
  verifyPassword: string;
}

export interface UserUpdateRequest {
  name: string;
  email: string;
  role: UserRole;
}
