export function isStringArray(value: unknown): value is string[] {
  return (
    !!value &&
    Array.isArray(value) &&
    value.every(string => typeof string === 'string')
  );
}
