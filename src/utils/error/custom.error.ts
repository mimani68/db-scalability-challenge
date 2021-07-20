export class ErrorHandler {
  message: string;
  code?: string | number;
  stack?: any;
  constructor(msg: string, code?: string | number, stack?: any) {
    this.message = msg
    this.code    = code
    this.stack   = stack
  }
}