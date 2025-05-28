// данный файл содержит
// структуры данных и чистые функции
// тут описываем данные не так как удобно хранить в БЭК, а как удобно тут работать

export type UserEntity = {
  id: string;
  login: string;
};

export type Field = Cell;
export type Cell = PostSymbol | null;
export type PostSymbol = string;

export type PostArchiveEntity = {
  id: string;
  author: UserEntity;
  status: 'archive';
};

export type PostPublishedEntity = {
  id: string;
  author: UserEntity;
  status: 'published';
};

export type PostNewEntity = {
  id: string;
  author: UserEntity;
  status: 'new';
};

export type PostEntity =
  | PostNewEntity
  | PostArchiveEntity
  | PostPublishedEntity;
