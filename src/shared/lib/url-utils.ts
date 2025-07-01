function getOrigin(): string {
  return globalThis.location.origin || 'https://ay-petry.ru';
}

export const urlUtils = { getOrigin };
