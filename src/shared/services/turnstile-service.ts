import {
  TurnstileValidateResponse,
  validateTurnstileToken
} from 'next-turnstile';
import { TurnstileError } from '@/shared/model/turnstile-error';

const CLOUDFRLARE_KEY = process.env.CF_SECRET_KEY || '';

const getCfToken = (data: unknown): string | null =>
  (!!data &&
    typeof data === 'object' &&
    'cf-turnstile-response' in data &&
    typeof data['cf-turnstile-response'] === 'string' &&
    data['cf-turnstile-response']) ||
  null;

const safeVerifyHuman = async (
  data: unknown
): Promise<TurnstileValidateResponse> => {
  const token = getCfToken(data);

  const result = token
    ? await validateTurnstileToken({
        token,
        secretKey: CLOUDFRLARE_KEY
      })
    : { success: false };

  return result;
};

const verifyHuman = async (data: unknown): Promise<true> => {
  const token = getCfToken(data);

  if (!token) {
    throw new TurnstileError('Missing CF Token');
  }

  const result = await validateTurnstileToken({
    token,
    secretKey: CLOUDFRLARE_KEY
  });

  if (!result.success) {
    throw new TurnstileError('Human test failed');
  }

  return result.success;
};

export const turnstileService = { verifyHuman, safeVerifyHuman };
