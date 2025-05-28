'use client';

const FAVOURITES_TOURS_KEY = 'favouritesTours';

export function getFavouriteTours(): number[] {
  const favouritesFromStorage =
    window.localStorage.getItem(FAVOURITES_TOURS_KEY);
  const favouritesTours: number[] = [];

  try {
    let parsedFavouritesTours;
    if (favouritesFromStorage) {
      parsedFavouritesTours = JSON.parse(favouritesFromStorage);
    }
    if (
      Array.isArray(parsedFavouritesTours) &&
      parsedFavouritesTours.every(item => typeof item === 'number')
    ) {
      favouritesTours.push(...parsedFavouritesTours);
    }
  } catch {
    // do nothing
  }

  return favouritesTours;
}

export function addTourToFavourites(id: number): void {
  const favouritesFromStorage = getFavouriteTours();

  window.localStorage.setItem(
    FAVOURITES_TOURS_KEY,
    JSON.stringify([...favouritesFromStorage, id])
  );
}

export function removeFromFavourite(id: number): void {
  const favouritesFromStorage = getFavouriteTours();

  window.localStorage.setItem(
    FAVOURITES_TOURS_KEY,
    JSON.stringify(
      favouritesFromStorage.filter(favouriteTourId => favouriteTourId !== id)
    )
  );
}
