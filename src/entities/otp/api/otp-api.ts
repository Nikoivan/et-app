import { apiClient } from '@/shared/api/api-client';

type SendNoteConfig = {
  email: string;
};

const baseUrl = 'otp';

const sendCode = <T>({ email }: SendNoteConfig) =>
  apiClient.post<T>({
    url: baseUrl,
    body: JSON.stringify({ email })
  });

export const otpApi = { sendCode };
