import { FC } from 'react';

import { ServiceView } from '@/views/legacy/server';

const service = {
  id: 7,
  title: 'Прокат зимнего снаряжения в Крыму',
  content: 'Прокат зимнего снаряжения в Крыму',
  mainImage: '/images/ekskursii.jpg',
  images: []
};

export const dynamic = 'force-static';

const LegacyPage: FC = async () => <ServiceView {...service} />;

export default LegacyPage;
