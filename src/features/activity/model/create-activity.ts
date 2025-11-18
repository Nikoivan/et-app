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
    type: 'select',
    label: 'Тип активности',
    name: 'type',
    options: ['авто']
  },
  {
    type: 'number',
    label: 'Идентификатор тура',
    name: 'tourId',
    multiple: true
  },
  {
    type: 'stringArray',
    label: 'Теги',
    name: 'tags',
    options: ['джип тур', 'пеший тур']
  },
  {
    type: 'stringArray',
    label: 'Категории',
    name: 'categories',
    options: ['авто', 'пеший']
  },
  {
    type: 'number',
    label: 'Скидка',
    name: 'discount'
  }
];

export const initialCreateActivityFormData = {
  title: '',
  description: '',
  startTime: '',
  finishTime: '',
  places: '',
  groupPrice: '',
  personPrice: '',
  type: '',
  tourId: '',
  tags: [],
  categories: [],
  discount: '',
  status: 'active',
  photos: []
};
