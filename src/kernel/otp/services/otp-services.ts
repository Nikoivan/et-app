import 'server-only';

import { OtpCreateData } from '@/features/otp/domain';
import { Otp } from '../../../../generated/prisma/client';
import { otpRepositories } from '@/entities/otp/server';
import { otpUtils } from '../lib/otp-utils';
import { Either, left, right } from '@/shared/lib/either';

const createOtpRecord = (data: OtpCreateData): Promise<Otp> =>
  otpRepositories.createOtp({ ...data, code: otpUtils.generateOtpCode() });

const checkOtp = async (
  code: string
): Promise<Either<string, { success: boolean }>> => {
  const otp = await otpRepositories.getOtpByCode(code);

  if (!otp) {
    return left('Такой код не существует');
  }

  const { createdAt } = otp;

  const expired = otpUtils.isOtpExpired(createdAt);

  return right({ success: !expired });
};

export const otpService = { createOtpRecord, checkOtp };
