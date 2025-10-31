import { postApi } from '@/features/post/api/post-api';
import { FormDialogDomain } from '@/entities/form-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postEditSchema, PostUpdate } from '@/entities/post';
import { toast } from 'sonner';

const errorMessage = 'Исходные данные не верны, действие невозможно';

export const useEditPost = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<string, Error, PostUpdate>({
    mutationFn: data => postApi.editPost(data),
    onSuccess: message => {
      queryClient.invalidateQueries({ queryKey: [postApi.baseKey] });
      toast.message(message);
    },

    onError: error => toast.error(error.message)
  });

  return async (data: FormDialogDomain.FormData) => {
    const result = postEditSchema.safeParse(data);

    if (!result.success) {
      throw new Error(errorMessage);
    }

    mutation.mutate(result.data);
  };
};
