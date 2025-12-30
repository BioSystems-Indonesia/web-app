import { HttpStatus } from "@/lib/constant/responseCode";

export type APIResponse<T = unknown> = {
  code: number;
  message: string;
  data?: T;
  error?: string | object | unknown;
};

export class APIResponseBuilder {
  static success<T>(data: T): APIResponse {
    return {
      code: HttpStatus.OK,
      message: "Ok",
      data,
    };
  }

  static created<T>(data: T): APIResponse {
    return {
      code: HttpStatus.CREATED,
      message: "Ok",
      data,
    };
  }

  static badRequest(error?: unknown): APIResponse {
    return {
      code: HttpStatus.BAD_REQUEST,
      message: "Bad Request",
      error,
    };
  }

  static notFound(error?: unknown): APIResponse {
    return {
      code: HttpStatus.NOT_FOUND,
      message: "Not Found",
      error,
    };
  }

  static vaidationError(error?: unknown): APIResponse {
    return {
      code: HttpStatus.BAD_REQUEST,
      message: "Bad Request",
      error,
    };
  }

  static unauthorized(error?: unknown): APIResponse {
    return {
      code: HttpStatus.UNAUTHORIZED,
      message: "Unatuhorized",
      error,
    };
  }

  static internalServerError(error?: unknown): APIResponse {
    return {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
      error,
    };
  }
}
