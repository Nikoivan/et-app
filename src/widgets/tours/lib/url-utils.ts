import { urlUtils } from '@/shared/lib/url-utils';

export const getUserToursUrl = (userId: number) => {
  const params = new URLSearchParams();
  params.append('user_id', userId.toString());

  return `${urlUtils.getApiUrl()}/tour/user?${params.toString()}`;
};

export const getOwnUserToursUrl = () => {
  return `${urlUtils.getApiUrl()}/tour/user`;
};
