import { postApi } from '@/features/post/api/post-api';
import { FormDialogDomain } from '@/entities/form-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostCreate } from '@/entities/post';
import { toast } from 'sonner';
import { postCreateSchema } from '@/entities/post/model/schemas';

const errorMessage = 'Исходные данные не верны, действие невозможно';

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<string, Error, PostCreate>({
    mutationFn: data => postApi.createPost(data),
    onSuccess: message => {
      queryClient.invalidateQueries({ queryKey: [postApi.baseKey] });
      toast.message(message);
    },

    onError: error => toast.error(error.message)
  });

  return async (data: FormDialogDomain.FormData) => {
    const result = postCreateSchema.safeParse(data);

    if (!result.success) {
      throw new Error(errorMessage);
    }

    mutation.mutate(result.data);
  };
};
