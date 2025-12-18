import { dbClient } from '@/shared/lib/db';

type OtpCreateData = {
  email: string;
  tel: string;
  code: string;
};

const createOtp = (data: OtpCreateData) => dbClient..create(data);

export const otpRepositories = {};
