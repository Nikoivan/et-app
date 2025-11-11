import { FormDialogDomain } from '@/entities/form-dialog';

export const createTour: FormDialogDomain.FormDataModelItem[] = [
  {
    type: 'string',
    label: 'Название тура',
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
    name: 'mainPhoto',
    required: true
  },
  {
    type: 'string',
    label: 'Контент',
    name: 'content',
    required: true
  },
  {
    type: 'string',
    label: 'Уникальный адрес страницы',
    name: 'slug',
    required: true
  },
  {
    type: 'number',
    label: 'Цена тура',
    name: 'price',
    required: true
  },
  {
    type: 'number',
    label: 'Продолжительность тура',
    name: 'duration',
    required: true
  },
  {
    type: 'stringArray',
    label: 'Категории тура',
    name: 'categories',
    options: ['popular', 'dzhip-tour', 'auto', 'mountain']
  },
  {
    type: 'files',
    label: 'Фотографии',
    name: 'photos',
    multiple: true
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

export const initialCreateTourFormData = {
  title: '',
  description: '',
  mainPhoto: undefined,
  content: '',
  price: '',
  slug: '',
  duration: '',
  status: 'new',
  categories: [],
  photos: undefined,
  descriptionText: '',
  startPlace: ''
};
