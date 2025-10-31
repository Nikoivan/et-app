import { FC } from 'react';
import { Button } from '@/shared/ui/button';
import { XCircle } from 'lucide-react';
import { ConfirmDialog } from '@/entities/confirm-dialog';
import { useDeletePost } from '@/features/post/hooks/use-delete-post';

export const DeletePost: FC<{ id: number }> = ({ id }) => {
  const onDelete = useDeletePost(id);

  return (
    <ConfirmDialog
      title='Удаление тура'
      description='Вы уверенны, что хотите удалить этот тур?'
      triggger={
        <Button variant='ghost' size='sm'>
          <XCircle className='size-4' />
        </Button>
      }
      onSubmit={onDelete}
    />
  );
};
