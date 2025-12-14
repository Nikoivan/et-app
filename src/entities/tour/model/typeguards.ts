const isPhotoEntity = (value: unknown) =>
  !!value &&
  typeof value === 'object' &&
  'title' in value &&
  typeof value.title === 'string' &&
  'source' in value &&
  typeof value.source === 'string' &&
  'authorId' in value &&
  typeof value.authorId === 'number';

export const tourTypeguards = { isPhotoEntity };
