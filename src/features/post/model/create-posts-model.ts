import { FormDialogDomain } from '@/entities/form-dialog';

export const createPostsFormModel: FormDialogDomain.FormDataModelItem[] = [
  {
    type: 'files',
    label: 'Файл миграции',
    name: 'files',
    required: true
  }
];

export const createPostModel: FormDialogDomain.FormDataModelItem[] = [
  {
    type: 'string',
    label: 'Название поста',
    name: 'title',
    required: true
  },
  {
    type: 'string',
    label: 'Описание тура',
    name: 'description',
    required: true
  },
  {
    type: 'files',
    label: 'Заглавное фото',
    name: 'image',
    required: true
  },
  {
    type: 'string',
    label: 'Контент',
    name: 'content',
    required: true
  },
  {
    type: 'select',
    label: 'Тип поста',
    name: 'type',
    required: true,
    options: ['post', 'news', 'tour']
  },
  {
    type: 'files',
    label: 'Заглавное фото',
    name: 'images',
    required: true
  },
  {
    type: 'string',
    label: 'Уникальный адрес тура внутри системы',
    name: 'route',
    required: true
  },
  {
    type: 'stringArray',
    label: 'Уникальный адрес тура внутри системы',
    name: 'metaKeywords',
    required: true
  },
  {
    type: 'stringArray',
    label: 'Категории тура',
    name: 'categories',
    options: ['home', 'new']
  },
  {
    type: 'string',
    label: 'Meta title',
    name: 'metaTitle'
  },
  {
    type: 'string',
    label: 'Meta description',
    name: 'metaDescription'
  },
  {
    type: 'string',
    label: 'Ссылка',
    name: 'link'
  },
  {
    type: 'number',
    label: 'Цена тура',
    name: 'price'
  },
  {
    type: 'number',
    label: 'Продолжительность тура',
    name: 'duration'
  },
  {
    type: 'string',
    label: 'Текст описание',
    name: 'descriptionText'
  },
  {
    type: 'string',
    label: 'Место старта тура',
    name: 'startPlace'
  }
];

export const initialPostCreateFormData = {
  title: '',
  description: '',
  content: '',
  type: '',
  guid: '',
  image: undefined,
  images: undefined,
  status: 'fresh',
  route: '',
  metaKeywords: [],
  categories: [],
  metaTitle: '',
  metaDescription: '',
  link: '',
  price: '',
  duration: ''
};
