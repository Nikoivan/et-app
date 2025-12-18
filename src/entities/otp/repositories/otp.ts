import { dbClient } from '@/shared/lib/db';

type OtpCreateData = {
  email: string;
  tel: string;
  code: string;
};

const createOtp = (data: OtpCreateData) => dbClient.otp.create({ data });

export const otpRepositories = { createOtp };
