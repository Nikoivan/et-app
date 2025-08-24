import { FormDialogDomain } from '@/entities/form-dialog';

export const applicationFormModel: FormDialogDomain.FormDataModelItem[] = [
  {
    type: 'string',
    label: 'Ваше имя',
    name: 'name',
    required: true
  },
  {
    type: 'string',
    label: 'Контактный телефон',
    name: 'phone',
    required: true
  },
  {
    type: 'string',
    label: 'Попробуй заполнить',
    name: 'check',
    hidden: true
  },
  {
    type: 'string',
    label: 'Комментарии',
    name: 'description',
    multiple: true
  }
];
