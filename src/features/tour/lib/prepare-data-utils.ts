import { DraftCreateTourData } from '@/features/tour/domain';

const prepareDataToCreate = (
  data: DraftCreateTourData
): [string, string | File][] => {
  const { mainPhoto, photos, ...restData } = data;

  const stringValues = Object.entries(restData).map(([key, value]) => [
    key,
    typeof value === 'string' ? value : JSON.stringify(value)
  ]);

  const preparedPhotos: [string, string | File][] = [
    ['mainPhoto', mainPhoto[0]]
  ];

  if (!!photos && photos.length) {
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

export const prepareDataUtils = { prepareDataToCreate };
