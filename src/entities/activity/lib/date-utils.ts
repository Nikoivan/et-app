function prepareDate(value: string | Date): Date {
  return typeof value === 'string' ? new Date(value) : value;
}

export const dateUtils = { prepareDate };
