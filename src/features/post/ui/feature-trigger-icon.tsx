import { FC } from 'react';
import { FeatureTypes } from '@/features/post/domain';
import { UserPen } from 'lucide-react';

export const FeatureTriggerIcon: FC<{ type: FeatureTypes }> = ({ type }) => (
  <>{type === 'edit' ? <UserPen className='size-4' /> : 'Создать пост'}</>
);
