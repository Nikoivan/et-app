import { apiClient } from '@/shared/api/api-client';

type SendNoteConfig = {
  email: string;
  tel: string;
};

const baseUrl = 'otp';

const sendCode = <T>(data: SendNoteConfig) =>
  apiClient.post<T>({
    url: baseUrl,
    body: JSON.stringify(data)
  });

export const otpApi = { sendCode };
