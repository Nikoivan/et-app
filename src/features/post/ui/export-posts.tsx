'use client';

import { FC } from 'react';
import { Button } from '@/shared/ui/button';
import { postApi } from '@/features/post/api/post-api';
import { toast } from 'sonner';

export const ExportPosts: FC = () => {
  const download = async () => {
    const response = await postApi.exportPosts();

    if (!response || !response.ok) {
      return toast.error('Ошибка экспорта постов');
    }

    const blob: Blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'posts.json';
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button variant='ghost' onClick={download}>
      Экспорт постов
    </Button>
  );
};
