const normalizePhone = (value: unknown): string => {
  if (typeof value !== 'string') return '';

  return value.replace(/[\s()-]/g, '');
};

export const otpUtils = { normalizePhone };
