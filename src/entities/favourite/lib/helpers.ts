'use client';

function getFavouriteTours(): number[] | null {
  const jsonTours = globalThis?.localStorage?.getItem('favouritesTours');

  if (!jsonTours) {
    return null;
  }

  try {
    const toursIds = JSON.parse(jsonTours);

    return Array.isArray(toursIds) &&
      toursIds.every(toursId => typeof toursId === 'number')
      ? toursIds
      : null;
  } catch {
    console.warn('Ошибка при парсинг избранных туров');
  }
  return null;
}

export function isTourFavourite(id: number): boolean {
  const favouriteToursIds = getFavouriteTours();

  return !!favouriteToursIds?.length && favouriteToursIds.includes(id);
}
