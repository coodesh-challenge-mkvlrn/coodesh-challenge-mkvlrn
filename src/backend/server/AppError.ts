export enum ErrorType {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export class AppError extends Error {
  public statusCode: number;

  public type: string;

  public message: string;

  constructor(type: ErrorType, message: string) {
    super(message);
    this.statusCode = +type;
    this.type = ErrorType[type];
    this.message = message;
  }
}
