import { NextResponse } from "next/server";
import { HttpStatus } from "@/lib/constant/responseCode";
import { APIResponseBuilder } from "../api/apiResponse";
import { AuthenticationError, InvalidTokenError, NotFoundError, ValidationError } from "./error";

export class HttpErrorHandler {
  static handle(error: unknown) {
    if (error instanceof ValidationError) {
      return NextResponse.json(APIResponseBuilder.vaidationError(error.message), {
        status: HttpStatus.BAD_REQUEST,
      });
    }

    if (error instanceof NotFoundError) {
      return NextResponse.json(APIResponseBuilder.notFound(error.message), {
        status: HttpStatus.NOT_FOUND,
      });
    }

    if (error instanceof AuthenticationError) {
      return NextResponse.json(APIResponseBuilder.unauthorized(error.message), {
        status: HttpStatus.UNAUTHORIZED,
      });
    }

    if (error instanceof InvalidTokenError) {
      return NextResponse.json(APIResponseBuilder.unauthorized(error.message), {
        status: HttpStatus.UNAUTHORIZED,
      });
    }

    return NextResponse.json(APIResponseBuilder.internalServerError(error), {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}
