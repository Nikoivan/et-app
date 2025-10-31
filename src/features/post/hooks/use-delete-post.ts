import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postApi } from '@/features/post/api/post-api';

export const useDeletePost = (id: number): (() => Promise<void>) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postApi.deletePost,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [postApi.baseKey] })
  });

  return async () => {
    mutation.mutate(id);
  };
};
