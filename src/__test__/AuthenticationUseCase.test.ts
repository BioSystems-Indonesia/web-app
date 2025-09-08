import { Authentication } from "@/domain/authentication/Authentication";
import { AuthenticationUseCase } from "@/usecases/authentication/AuthenticationUseCase";
import { AuthenticationRepository } from "@/domain/authentication/AuthenticationRepository";
import { Hasher } from "@/domain/security/Hasher";
import { JwtService, Claims } from "@/lib/helper/JwtService";

describe("AuthenticationUseCase", () => {
  let authUseCase: AuthenticationUseCase;
  let mockAuthRepo: jest.Mocked<AuthenticationRepository>;
  let mockHasher: jest.Mocked<Hasher>;
  let mockJwt: jest.Mocked<JwtService>;

  beforeEach(() => {
    mockAuthRepo = {
      findByUsername: jest.fn(),
    };

    mockHasher = {
      hash: jest.fn(),
      compare: jest.fn(),
    };

    mockJwt = {
      generate: jest.fn(),
      validate: jest.fn(),
    } as unknown as jest.Mocked<JwtService>;

    authUseCase = new AuthenticationUseCase(mockAuthRepo, mockHasher, mockJwt);
  });

  describe("login", () => {
    it("should authenticate a user successfully", async () => {
      const username = "JhonDoe";
      const password = "plainPassword";
      const hashedPassword = "hashedPassword";
      const user = new Authentication("1", username, hashedPassword, "user");
      const expectedToken = "jwt-token-123";

      mockAuthRepo.findByUsername.mockResolvedValue(user);
      mockHasher.compare.mockResolvedValue(true);
      mockJwt.generate.mockReturnValue(expectedToken);

      const result = await authUseCase.login(username, password);

      expect(mockAuthRepo.findByUsername).toHaveBeenCalledWith(username);
      expect(mockHasher.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(mockJwt.generate).toHaveBeenCalledWith({
        userId: "1",
        username: "JhonDoe",
        role: "user",
      });
      expect(result).toEqual({
        id: "1",
        token: expectedToken,
      });
    });

    it("should throw error when password is invalid", async () => {
      const username = "JhonDoe";
      const password = "wrongPassword";
      const user = new Authentication("1", username, "hashedPassword", "user");

      mockAuthRepo.findByUsername.mockResolvedValue(user);
      mockHasher.compare.mockResolvedValue(false);

      await expect(authUseCase.login(username, password)).rejects.toThrow(
        "username or password is wrong!"
      );

      expect(mockAuthRepo.findByUsername).toHaveBeenCalledWith(username);
      expect(mockHasher.compare).toHaveBeenCalledWith(password, "hashedPassword");
      expect(mockJwt.generate).not.toHaveBeenCalled();
    });

    it("should throw error when user is not found", async () => {
      const username = "nonexistent";
      const password = "password";

      mockAuthRepo.findByUsername.mockRejectedValue(new Error("User not found"));

      await expect(authUseCase.login(username, password)).rejects.toThrow("User not found");

      expect(mockAuthRepo.findByUsername).toHaveBeenCalledWith(username);
      expect(mockHasher.compare).not.toHaveBeenCalled();
      expect(mockJwt.generate).not.toHaveBeenCalled();
    });
  });

  describe("tokenVerify", () => {
    it("should verify valid token successfully", async () => {
      const token = "valid-jwt-token";
      const expectedPayload: Claims = {
        userId: "1",
        username: "JhonDoe",
        role: "user",
      };

      mockJwt.validate.mockReturnValue({
        valid: true,
        payload: expectedPayload,
      });

      const result = await authUseCase.tokenVerify(token);

      expect(mockJwt.validate).toHaveBeenCalledWith(token);
      expect(result).toEqual(expectedPayload);
    });

    it("should throw error when token is empty", async () => {
      await expect(authUseCase.tokenVerify("")).rejects.toThrow("invalid token");

      expect(mockJwt.validate).not.toHaveBeenCalled();
    });

    it("should throw error when token is invalid", async () => {
      const token = "invalid-jwt-token";

      mockJwt.validate.mockReturnValue({
        valid: false,
        error: "Token expired",
      });

      await expect(authUseCase.tokenVerify(token)).rejects.toThrow("Token expired");

      expect(mockJwt.validate).toHaveBeenCalledWith(token);
    });

    it("should throw generic error when no specific error message", async () => {
      const token = "invalid-jwt-token";

      mockJwt.validate.mockReturnValue({
        valid: false,
      });

      await expect(authUseCase.tokenVerify(token)).rejects.toThrow("invalid token");

      expect(mockJwt.validate).toHaveBeenCalledWith(token);
    });
  });
});
