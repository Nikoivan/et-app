'use server';

import { FC } from 'react';

import { ServiceView } from '@/views/service/server';

const service = {
  id: 11,
  title: 'Туры',
  content: 'список туров в виде пиктограмм',
  mainImage: 'https://energy-tur.ru/wp-content/uploads/2018/06/bg_jeep.png',
  images: []
};

const ServicePage: FC = async () => <ServiceView {...service} />;

export default ServicePage;
