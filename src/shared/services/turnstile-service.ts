import {
  TurnstileValidateResponse,
  validateTurnstileToken
} from 'next-turnstile';

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

const verifyHuman = async (data: unknown): Promise<boolean> => {
  const token = getCfToken(data);

  if (!token) {
    return false;
  }

  const result = await validateTurnstileToken({
    token,
    secretKey: CLOUDFRLARE_KEY
  });

  return result.success;
};

export const turnstileService = { verifyHuman, safeVerifyHuman };
