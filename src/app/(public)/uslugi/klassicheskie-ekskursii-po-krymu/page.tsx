'use server';

import { FC } from 'react';

import { ServiceView } from '@/views/legacy/server';

const service = {
  id: 1,
  title: 'Классические экскурсии по Крыму',
  content: 'Классические экскурсии в Крыму',
  mainImage: '/images/ekskursii.jpg',
  images: []
};

const LegacyPage: FC = async () => <ServiceView {...service} />;

export default LegacyPage;
