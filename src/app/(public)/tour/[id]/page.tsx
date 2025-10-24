'use server';

import { FC } from 'react';
import { TourView } from '@/views/tour/server';
import { ServerTourProps } from '@/shared/model/types';

const TourPage: FC<ServerTourProps> = async props => <TourView {...props} />;

export default TourPage;
