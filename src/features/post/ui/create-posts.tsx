'use client';

import { FC, useState } from 'react';
import { cn } from '@bem-react/classname';
import { FormDialog, FormDialogDomain } from '@/entities/form-dialog';
import { createPostsFormModel } from '@/features/post/model/create-posts-model';
import z from 'zod';
import { postApi } from '@/features/post/api/post-api';
import { toast } from 'sonner';

const cnCreatePosts = cn('CreatePosts');

export const CreatePosts: FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const onOpenChange = (value: boolean): void => setOpen(value);

  const onSubmit = async (data: FormDialogDomain.FormData) => {
    if (!data.files || !Array.isArray(data.files)) {
      return;
    }

    const formData = new FormData();

    formData.append('posts_file', data.files[0]);

    const result = await postApi.createPostsByFile(formData);

    if (!(result?.type === 'right')) {
      toast.error(result.error);

      return;
    }

    toast.success(String(result.value));

    onOpenChange(false);
  };

  return (
    <FormDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className={cnCreatePosts()}
      triggerButton='Создать посты из файла'
      formDataModel={createPostsFormModel}
      initialData={{ files: [] }}
      onSubmit={onSubmit}
      schema={z.object({ files: z.array(z.instanceof(File)) })}
    />
  );
};
