enum DialogTypes {
  CREATE = 'create',
  EDIT = 'edit',
  READ = 'read'
}

type DialogType<T> = {
  [K in keyof T]: T[K] extends string ? T[K] : never;
}[keyof T];

export type Settings = {
  dialogType: DialogType<DialogTypes>;
};
