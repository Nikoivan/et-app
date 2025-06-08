export type TourEntity = {
  id: number;
  title: string;
  description: string;
  mainPhoto: string;
  price: number;
  duration: string;
  categories: string[];
  authorId: string;
  photos: string[];
  reviews: Review[];
};
