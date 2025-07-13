'use client';

import { SessionDomain } from '@/entities/user/server';
import { cn } from '@bem-react/classname';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/shared/ui/dialog';
import { FormEvent, useState } from 'react';
import { z } from 'zod';
import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';

const cnCreateTourForm = cn('CreateTourForm');

enum DialogTypes {
  CREATE = 'create',
  EDIT = 'edit',
  READ = 'read'
}

type DialogType<T> = {
  [K in keyof T]: T[K] extends string ? T[K] : never;
}[keyof T];

type Settings = {
  dialogType: DialogType<DialogTypes>;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
};

const initialFormState: FormData = {
  name: '',
  email: '',
  phone: ''
};

const userSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().regex(/\+7\s\(\d{3}\)\s\d{3}\-\d{2}\-\d{2}/)
});

export function CreateTourForm<T extends Record<string, string> = FormData>({
  session
}: {
  session: SessionDomain.SessionEntity;
}) {
  const [userFormData, setUserFormData] = useState<Partial<T>>({});
  const [showErrors, setShowErrors] = useState(false);

  const settings: Settings = {
    dialogType: 'create'
  };

  const formData = {
    ...initialFormState,
    ...userFormData
  };

  const isChanged = Object.entries(userFormData).some(
    ([key, value]) => initialFormState[key as never] !== value
  );

  const validate = () => {
    const result = userSchema.safeParse(formData);

    if (result.success) {
      return undefined;
    }

    return result.error.format();
  };

  const reset = () => setUserFormData({});

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validate();

    if (errors) {
      setShowErrors(true);

      return;
    }
  };

  const errors = showErrors ? validate() : undefined;

  return (
    <div className={cnCreateTourForm(null, ['text-center'])}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline'>Создать тур</Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={onSubmit} className={cnCreateTourForm('Form')}>
            <DialogHeader>
              <DialogTitle>Создание тура</DialogTitle>
              <DialogDescription>Опишите ваш тур</DialogDescription>
            </DialogHeader>
            <div>
              <Label>Имя</Label>
              <Input
                value={formData.name}
                name='name'
                onChange={e =>
                  setUserFormData({
                    ...userFormData,
                    [e.target.name]: e.target.value
                  })
                }
              />
            </div>
            <div className='text-red-600'>
              {errors?.name?._errors.join(', ')}
            </div>
            <div>
              <Label>Электронная почта</Label>
              <Input
                value={formData.email}
                name='email'
                onChange={e =>
                  setUserFormData({
                    ...userFormData,
                    [e.target.name]: e.target.value
                  })
                }
              />
            </div>
            <div className='text-red-600'>
              {errors?.email?._errors.join(', ')}
            </div>
            <div>
              <Label>Телефон</Label>
              <Input
                value={formData.phone}
                name='phone'
                onChange={e =>
                  setUserFormData({
                    ...userFormData,
                    [e.target.name]: e.target.value
                  })
                }
              />
            </div>
            <div className='text-red-600'>
              {errors?.phone?._errors.join(', ')}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline'>Отмена</Button>
              </DialogClose>
              <Button variant='outline' onClick={reset} disabled={!isChanged}>
                Очистить
              </Button>
              <Button variant='outline' type='submit' disabled={showErrors}>
                Сохранить
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
