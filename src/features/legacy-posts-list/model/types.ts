export type LegacyPostsListElement = {
  id: number;
  postAuthorId: number;
  postDate: string;
  guid: string;
  postContent: string | null;
  postTitle: string | null;
  postStatus: string | null;
  postName: string | null;
  postModified: string | null;
  postParent: number | null;
};

export type CreateLegacyPostListElementCommand = {
  postAuthorId: number;
  postDate: string;
  guid: string;
  postTitle: string;
  postDescription: string;
  postKeywords: string[];
  postContent: string;
};

export type DeleteLegacyPostListElementCommand = {
  id: number;
};
