import { FormDialogDomain } from '@/entities/form-dialog';
import { tourApi } from '@/features/tour/api/tour-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  editTourSchema,
  TourUpdate
} from '@/features/tour/lib/schemas/create-tour-schemas';
import { Either } from '@/shared/lib/either';
import { Tour } from '@prisma/client';

type Props = {
  onSuccess?: (data?: unknown) => void;
  onError?: (error: Error) => void;
};

export const useEditTour = (props?: Props) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation<Either<string, Tour>, Error, TourUpdate>({
    mutationFn: tourApi.editTour,
    onSuccess: either => {
      if (either.type === 'left')
        throw new Error('Ошибка при создание нового тура');

      queryClient.invalidateQueries({ queryKey: [tourApi.baseKey] });

      props?.onSuccess && props.onSuccess();
    },
    onError: error => {
      props?.onError && props.onError(error);
    }
  });

  return async (data: FormDialogDomain.FormData) => {
    const result = editTourSchema.safeParse(data);

    if (!result.success) {
      return;
    }

    mutate(result.data);
  };
};
