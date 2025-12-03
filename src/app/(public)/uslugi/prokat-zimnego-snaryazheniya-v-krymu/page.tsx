'use server';

import { FC } from 'react';

import { ServiceView } from '@/views/service/server';

const service = {
  id: 7,
  title: 'Прокат зимнего снаряжения в Крыму',
  content: 'Прокат зимнего снаряжения в Крыму',
  mainImage: '/images/ekskursii.jpg',
  images: []
};

const ServicePage: FC = async () => <ServiceView {...service} />;

export default ServicePage;
