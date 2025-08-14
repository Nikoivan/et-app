import { FormDialogDomain } from '@/entities/form-dialog';

export const createActivityFormModel: FormDialogDomain.FormDataModelItem[] = [
  {
    type: 'string',
    label: 'Название',
    name: 'title',
    required: true
  },
  {
    type: 'string',
    label: 'Описание',
    name: 'description',
    required: true
  },
  {
    type: 'date',
    label: 'Время начала',
    name: 'startTime',
    required: true
  },
  {
    type: 'date',
    label: 'Время окончания',
    name: 'finishTime',
    required: true
  },
  {
    type: 'number',
    label: 'Цена билета (групповая)',
    name: 'groupPrice',
    required: true
  },
  {
    type: 'number',
    label: 'Цена за группу',
    name: 'personPrice',
    required: true
  },
  {
    type: 'number',
    label: 'Количество мест',
    name: 'places',
    required: true
  },
  {
    type: 'string',
    label: 'Тип активности',
    name: 'type'
  },
  {
    type: 'string',
    label: 'Идентификатор тура',
    name: 'tourId',
    multiple: true
  },
  {
    type: 'stringArray',
    label: 'Теги',
    name: 'tags'
  },
  {
    type: 'stringArray',
    label: 'Категории',
    name: 'categories'
  },
  {
    type: 'string',
    label: 'Скидка',
    name: 'discount'
  }
];

export const initialCreateActivityFormData = {
  title: '',
  description: '',
  status: '',
  authorId: '',
  startTime: '',
  finishTime: '',
  places: '',
  groupPrice: '',
  personPrice: '',
  type: '',
  tourId: '',
  tags: [],
  categories: [],
  discount: ''
};
