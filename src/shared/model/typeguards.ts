export const isString = (value: unknown): value is string =>
  !!value && typeof value === 'string';

export const isNumber = (value: unknown): value is number =>
  !!value && typeof value === 'number';

export const isObject = (value: unknown): value is object =>
  !!value && typeof value === 'object';

export const isStringArray = (value: unknown): value is string[] =>
  !!value && Array.isArray(value) && (value.every(isString) || !value.length);
