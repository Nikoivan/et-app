export type Estimation = {
  guideWork: number;
  informationQuality: number;
  trailQuality: number;
};

export type Review = {
  id: string;
  content: string;
  estimation: Estimation;
  estimationValue: number;
  authorId: number;
  tourId?: number;
};
