'use server';

import { FC } from 'react';

import { ServiceView } from '@/views/service/server';

const service = {
  id: 13,
  title: 'Экскурсии в Крыму с лучшими ценами',
  content:
    'Экскурсии в Крыму 2025 год. Вашему вниманию представлены лучшие экскурсии по Крыму на 2025 год с описание и ценами.',
  mainImage: '/images/ekskursii.jpg',
  images: []
};

const ServicePage: FC = async () => <ServiceView {...service} />;

export default ServicePage;
