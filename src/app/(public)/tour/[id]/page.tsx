'use server';

import { FC } from 'react';
import { TourView } from '@/views/tour/server';
import { ServerFCProps } from '@/shared/model/types';

const TourPage: FC<ServerFCProps> = async props => <TourView {...props} />;

export default TourPage;
