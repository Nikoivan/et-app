import { FeatureTypes } from '@/features/post/domain';

export const getTitleByType = (type: FeatureTypes): string =>
  type === 'edit' ? 'Отредактировать пост' : 'Создать пост';
