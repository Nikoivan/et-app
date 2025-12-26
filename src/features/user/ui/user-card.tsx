'use client';

import { FC, useTransition } from 'react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/shared/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Separator } from '@/shared/ui/separator';
import { Loader2, Mail, Phone, Star, Trash2, User } from 'lucide-react';
import { SessionDomain } from '@/entities/user/server';

type Props = {
  onDelete(id: number): void;
  user: SessionDomain.UserEntity;
};

export const UserCard: FC<Props> = ({ user, onDelete }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      startTransition(async () => {
        await onDelete(user.id);
      });
    }
  };

  const getInitials = (login: string) => {
    return login.substring(0, 2).toUpperCase();
  };

  return (
    <Card className='w-full max-w-md shadow-md hover:shadow-lg transition-shadow'>
      <CardHeader className='flex flex-row items-center gap-4 pb-2'>
        <Avatar className='h-14 w-14 border'>
          <AvatarImage src='/images/mockAvatar.jpg' alt={user.login} />
          <AvatarFallback>{getInitials(user.login)}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-1'>
          <CardTitle className='text-xl'>{user.login}</CardTitle>
          <div className='flex gap-2'>
            <Badge variant='secondary' className='capitalize'>
              {user.role}
            </Badge>
            {user.rating !== undefined && (
              <Badge variant='outline' className='flex items-center gap-1'>
                <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
                {user.rating}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <Separator className='my-2' />

      <CardContent className='grid gap-4 mt-4'>
        {(user.firstName || user.lastName) && (
          <div className='flex items-center gap-3 text-sm'>
            <User className='h-4 w-4 text-muted-foreground' />
            <span className='font-medium'>
              {[user.firstName, user.lastName].filter(Boolean).join(' ')}
            </span>
          </div>
        )}
        {user.email && (
          <div className='flex items-center gap-3 text-sm'>
            <Mail className='h-4 w-4 text-muted-foreground' />
            <span>{user.email}</span>
          </div>
        )}
        <div className='flex items-center gap-3 text-sm'>
          <Phone className='h-4 w-4 text-muted-foreground' />
          <span>{user.phone}</span>
        </div>

        <div className='text-xs text-muted-foreground mt-2'>
          User ID: <span className='font-mono'>{String(user.id)}</span>
        </div>
      </CardContent>

      <CardFooter className='pt-2'>
        <Button
          variant='destructive'
          className='w-full'
          onClick={handleDelete}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Удаление...
            </>
          ) : (
            <>
              <Trash2 className='mr-2 h-4 w-4' />
              Удалить пользователя
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
