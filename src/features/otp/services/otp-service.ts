import 'server-only';

const generateOtpCode = (): string => String(Math.ceil(Math.random() * 10000));

export const otpService = { generateOtpCode };
