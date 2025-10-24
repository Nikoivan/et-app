export const mergeOptions = (defaultOptions: string[], values?: string[]) => {
  const valuesOptions = values?.filter(
    option => !defaultOptions.includes(option)
  );

  return valuesOptions?.length
    ? [...defaultOptions, ...valuesOptions]
    : defaultOptions;
};

export const prepareOptions = (options: string[], inputValue: string) =>
  options.filter(option =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  );
