export class BadRequestError extends Error {
  constructor(message?: string | { message: string }) {
    const actualMessage = typeof message === 'string' ? message : message?.message || '';
    super(actualMessage);
    this.name = 'BadRequestError';
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class UnauthorizedError extends Error {
  constructor(message?: string | { message: string }) {
    const actualMessage = typeof message === 'string' ? message : message?.message || '';
    super(actualMessage);
    this.name = 'UnauthorizedError';
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export interface ForbiddenArgs {
  [key: string]: any;
}

export class ForbiddenError extends Error {
  args: ForbiddenArgs;

  constructor(message?: string | { message: string; args?: ForbiddenArgs }) {
    const actualMessage = typeof message === 'string' ? message : message?.message || '';
    super(actualMessage);
    this.name = 'ForbiddenError';
    this.args = typeof message === 'object' && message?.args ? message.args : {};
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export class NotFoundError extends Error {
  constructor(message?: string | { message: string }) {
    const actualMessage = typeof message === 'string' ? message : message?.message || '';
    super(actualMessage);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class RemoteError extends Error {
  constructor(message?: string | { message: string }) {
    const actualMessage = typeof message === 'string' ? message : message?.message || '';
    super(actualMessage);
    this.name = 'RemoteError';
    Object.setPrototypeOf(this, RemoteError.prototype);
  }
}
