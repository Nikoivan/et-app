'use server';

import { FC } from 'react';

import { ServiceViewProps } from '@/views/legacy/domain';
import { ServiceMain } from '@/views/legacy/ui/service-main';

export const ServiceView: FC<ServiceViewProps> = async props => (
  <ServiceMain {...props} />
);
