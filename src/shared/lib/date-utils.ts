function getFormattedDate(stringDate: Date): string {
  const date = new Date(stringDate);

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}

function getFormattedValue(date: string, minLength: number = 2): string {
  const additionalLength = date.length - minLength;
  let additionalString = '';

  for (let i = 0; i < additionalLength; i++) {
    additionalString += `${additionalLength}${i}`;
  }

  return date.length < minLength ? `${additionalString}${date}` : date;
}

export const dateUtils = { getFormattedDate, getFormattedValue };
