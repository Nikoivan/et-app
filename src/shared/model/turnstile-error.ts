export class TurnstileError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'TurnstileError';
  }
}
