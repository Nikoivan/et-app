import { FormDialogDomain } from '@/entities/form-dialog';
import { CreateTourData } from '@/features/tour/domain';
import { createTourSchema } from '@/features/tour/lib/schemas/create-tour-schemas';

const prepareDataToCreate = (
  data: FormDialogDomain.FormData
): [string, string | File][] => {
  const { mainPhoto, photos, ...restData } = data;

  const stringValues = Object.entries(restData).map(([key, value]) => [
    key,
    typeof value === 'string' ? value : JSON.stringify(value)
  ]);

  if (!mainPhoto || !Array.isArray(mainPhoto)) {
    throw new Error('No main photos found');
  }

  const preparedPhotos: [string, string | File][] = [
    ['mainPhoto', mainPhoto?.[0]]
  ];

  if (!!photos && Array.isArray(photos) && photos.length) {
    stringValues.push(['filesLength', String(photos?.length)]);

    preparedPhotos.push(
      ...(Object.values(photos).map((file, idx) => [
        `file_${idx + 1}`,
        file
      ]) as [string, File][])
    );
  }

  return [...stringValues, ...preparedPhotos] as [string, string | File][];
};

const prepareNumberValues = (
  value: Record<string, string | File | number>
): Record<string, string | File | number> => {
  if (!value) {
    return value;
  }

  if ('price' in value && typeof value.price === 'string') {
    value.price = Number(value.price);
  }
  if ('duration' in value && typeof value.duration === 'string') {
    value.duration = Number(value.duration);
  }

  if ('categories' in value && typeof value.categories === 'string') {
    try {
      value.categories = JSON.parse(value.categories);
    } catch (e) {
      console.error(e);
    }
  }

  return value;
};

const getTourData = (formData: FormData): CreateTourData | null => {
  const data: Record<string, string | File> = Object.fromEntries(
    formData.entries()
  );

  const preparedData = prepareNumberValues(data);

  const result = createTourSchema.safeParse(preparedData);

  return result.success ? (result.data as unknown as CreateTourData) : null;
};

export const prepareDataUtils = { prepareDataToCreate, getTourData };
