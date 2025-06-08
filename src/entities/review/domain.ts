export type Estimation = {
  guideWork: number;
  informationQuality: number;
};

export type Review = {
  id: string;
  content: string;
  estimation: Estimation;
};
