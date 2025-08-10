import { urlUtils } from '@/shared/lib/url-utils';

export const getOwnUserActivitiesUrl = () => {
  return `${urlUtils.getApiUrl()}/activity/user`;
};
