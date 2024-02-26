export class NotFoundException extends Error {
  statusCode = 404;
  isOperational = true;

  constructor(message: string | undefined, isOperational = true, stack = "") {
    super(message);
  }
}
