'use client';

import { FC, useState } from 'react';
import { cn } from '@bem-react/classname';
import { postUtils } from '@/features/post/lib/post-utils';
import { createPostModel } from '@/features/post/model/create-posts-model';
import { FormDialog, FormDialogDomain } from '@/entities/form-dialog';
import { FeatureTypes } from '@/features/post/domain';
import { FeatureTriggerIcon } from '@/features/post/ui/feature-trigger-icon';
import { getTitleByType } from '@/features/post/lib/feature-utils';
import { useEditPost } from '@/features/post/hooks/use-edit-post';
import { useCreatePost } from '@/features/post/hooks/use-create-post';
import { postEditSchema } from '@/entities/post';
import { postCreateSchema } from '@/entities/post/model/schemas';
import { SessionDomain } from '@/entities/user/server';
import { FormCheckTypes, Value } from '@/entities/form-dialog/domain';

type Props = {
  session: SessionDomain.SessionEntity;
  type: FeatureTypes;
  initialData?: FormDialogDomain.FormData;
};

const cnFeaturePost = cn('FeaturePost');

export const FeaturePost: FC<Props> = ({ type, initialData, session }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const onEdit = useEditPost();
  const onCreate = useCreatePost();
  const title = getTitleByType(type);
  const schema = type === 'edit' ? postEditSchema : postCreateSchema;
  const startData = initialData || postUtils.getInitialPostData();

  const onOpenChange = (value: boolean) => setOpen(value);
  const onClose = () => setOpen(false);

  const onSubmit = async (data: FormDialogDomain.FormData) => {
    const fn = type === 'edit' ? onEdit : onCreate;

    await fn(data);

    setOpen(false);
  };

  return (
    <div className={cnFeaturePost(null, ['text-center'])}>
      <FormDialog
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onCancel={onClose}
        title={title}
        triggerButton={<FeatureTriggerIcon type={type} />}
        formDataModel={createPostModel}
        initialData={{
          ...startData,
          postAuthorId: session.id,
          user: session as unknown as Value<
            FormCheckTypes<Record<string, unknown>>
          >
        }}
        onSubmit={onSubmit}
        schema={schema}
      />
    </div>
  );
};
