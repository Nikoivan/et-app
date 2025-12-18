const isPhotoEntity = (value: unknown) => {
  // console.log({
  //   value,
  //   isValueObject: typeof value === 'object',
  //   title: {
  //     hasTitle: !!value && typeof value === 'object' && 'title' in value,
  //     titleValueType:
  //       !!value &&
  //       typeof value === 'object' &&
  //       'title' in value &&
  //       typeof value.title === 'string'
  //   },
  //   source: {
  //     hasTitle: !!value && typeof value === 'object' && 'source' in value,
  //     titleValueType:
  //       !!value &&
  //       typeof value === 'object' &&
  //       'source' in value &&
  //       typeof value.source === 'string'
  //   },
  //   authorId: {
  //     hasTitle: !!value && typeof value === 'object' && 'authorId' in value,
  //     titleValueType:
  //       !!value &&
  //       typeof value === 'object' &&
  //       'authorId' in value &&
  //       typeof value.authorId === 'number'
  //   }
  // });

  return (
    !!value &&
    typeof value === 'object' &&
    'title' in value &&
    typeof value.title === 'string' &&
    'source' in value &&
    typeof value.source === 'string' &&
    'authorId' in value &&
    typeof value.authorId === 'number'
  );
};

export const tourTypeguards = { isPhotoEntity };
