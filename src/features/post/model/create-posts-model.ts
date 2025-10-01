import { FormDialogDomain } from '@/entities/form-dialog';

export const createPostsFormModel: FormDialogDomain.FormDataModelItem[] = [
  {
    type: 'files',
    label: 'Файл миграции',
    name: 'files',
    required: true
  }
];
