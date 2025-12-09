import { z } from 'zod';

export const telSchema = z
  .string()
  .regex(
    /^(?:\+7|7|8)[ -]?\(?(?:9\d{2})\)?(?:[ -]?\d){7}$/,
    'Неверный формат телефона'
  );
