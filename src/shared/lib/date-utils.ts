function getFormattedDate(stringDate: Date): string {
  const date = new Date(stringDate);

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}

export const dateUtils = { getFormattedDate };
