export class SecurityOriginException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SecurityOriginException';
  }
}

export class SecurityLimitException extends Error {
  constructor(message: string) {
    super();
    this.name = 'SecurityLimitException';
  }
}
