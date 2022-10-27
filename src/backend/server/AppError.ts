export enum ErrorType {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export class AppError extends Error {
  public statusCode: number;

  constructor(public type: ErrorType, message: string) {
    super(message);
    this.statusCode = +type;
  }
}
