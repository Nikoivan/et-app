'use client';

import { FC, ReactNode } from 'react';
import { cn } from '@bem-react/classname';
import { toast } from 'sonner';
import { Post } from '@prisma/client';

import { postApi } from '@/features/post/api/post-api';
import { postUtils } from '@/features/post/lib/post-utils';
import { createPostModel } from '@/features/post/model/create-posts-model';
import { FormDialog, FormDialogDomain } from '@/entities/form-dialog';
import { postBaseSchema, postEditSchema } from '@/entities/post';

type Props = {
  type: 'create' | 'edit';
  initialData?: FormDialogDomain.FormData;
  triggerButton?: ReactNode;
};

const cnFeaturePost = cn('FeaturePost');

export const FeaturePost: FC<Props> = ({
  type,
  initialData,
  triggerButton
}) => {
  const schema = type === 'edit' ? postBaseSchema : postEditSchema;

  const onSubmit = async (data: FormDialogDomain.FormData) => {
    const fn = type === 'edit' ? postApi.editPost : postApi.createPost;
    const result = schema.safeParse(data);

    if (!result.success) {
      toast.error('Исходные данные не верны, действие невозможно');

      return;
    }

    const response = await fn<string>(result.data as Post);

    toast.message(response);
  };

  return (
    <div className={cnFeaturePost(null, ['text-center'])}>
      <FormDialog
        title='Создать пост'
        triggerButton={triggerButton || 'Создать пост'}
        formDataModel={createPostModel}
        initialData={initialData || postUtils.getInitialPostData()}
        onSubmit={onSubmit}
        schema={schema}
      />
    </div>
  );
};
