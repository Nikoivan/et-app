'use server';

import { FC } from 'react';
import { ServiceViewProps } from '@/views/service/domain';
import { ServiceMain } from '@/views/service/ui/service-main';

export const ServiceView: FC<ServiceViewProps> = async props => (
  <ServiceMain {...props} />
);
