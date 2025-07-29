export type TourCardEntity = {
  id: number;
  title: string;
  price: number;
  rating: number | null;
  duration: number | null;
  mainPhoto: string;
};

export type DraftCreateTourData = {
  title: string;
  description: string;
  mainPhoto: File[];
  content: string;
  price: string;
  duration: string;
  categories: string[];
  photos?: File[];
  descriptionText?: string;
  startPlace?: string;
};

export type CreateTourData = Omit<
  DraftCreateTourData,
  'mainPhoto' | 'photos'
> & {
  mainPhoto: File;
  photos?: Record<string, File>;
};
