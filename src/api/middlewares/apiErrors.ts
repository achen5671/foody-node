/* eslint-disable max-classes-per-file */

interface OptionalFields {
  errorCode?: number;
  data?: Record<string, unknown>;
}

export class ApiError extends Error {
  statusCode: number;
  errorCode: number;
  errorMessage?: string;
  data: Record<string, unknown> | undefined;

  constructor(
    statusCode: number,
    errorMessage?: string,
    opts?: OptionalFields
  ) {
    super(errorMessage);
    this.statusCode = statusCode;
    this.errorCode = opts?.errorCode || statusCode;
    this.errorMessage = errorMessage;
    this.data = opts?.data;
  }
}

export class ResourceDoesNotExistError extends ApiError {
  constructor(message?: string) {
    super(404, message || "Resource does not exist");
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message?: string) {
    super(401, message || "Unauthorized", { errorCode: 401001 });
  }
}

export class BadRequestError extends ApiError {
  constructor(message?: string) {
    super(400, message || "Bad Request");
  }
}

export class InternalServerError extends ApiError {
  constructor(message?: string) {
    super(500, message || "Internal Server Error");
  }
}

export class RequestTimeoutError extends ApiError {
  constructor(message?: string) {
    super(503, message || "Request Timeout Error");
  }
}

export class ConflictError extends ApiError {
  constructor(message?: string) {
    super(409, message || "Conflict");
  }
}
