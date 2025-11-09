Да. Коротко: привязывайте тип результата к аргументам через утилиты Prisma (+ TypeScript satisfies) — тогда возвращаемый
тип «сам» меняется от вашего select/include.

1) GetPayload + типизированные select/include
   import { PrismaClient, Prisma } from '@prisma/client'
   const prisma = new PrismaClient()

// Готовим переиспользуемый select и заставляем TS проверить его форму
const postCard = {
id: true,
title: true,
user: { select: { id: true, name: true } }
} satisfies Prisma.PostSelect

// Выводим тип результата из аргументов:
type PostCard = Prisma.PostGetPayload<{ select: typeof postCard }>

const rows: PostCard[] = await prisma.post.findMany({ select: postCard })

Это официальный паттерн: использовать сгенерированный *GetPayload вместе с select/include. А satisfies даёт строгую
проверку формы без «расширения» типа.
Prisma
+2
Prisma
+2

2) Обёртки, где тип результата зависит от типа аргументов

Когда пишете сервис-функции, используйте Prisma.Args / Prisma.Result / Prisma.Exact, чтобы результат строго
соответствовал переданным аргументам:

import { Prisma } from '@prisma/client'

async function getPosts<A extends Prisma.Args<typeof prisma.post, 'findMany'>>(
args: Prisma.Exact<A, Prisma.Args<typeof prisma.post, 'findMany'>>
): Promise<Prisma.Result<typeof prisma.post, A, 'findMany'>> {
return prisma.post.findMany(args as any)
}

// здесь тип rows выведется из args (учтёт ваш select/include)
const rows = await getPosts({
include: { user: { select: { id: true } } }
})

Эти утилиты как раз придуманы для «связывания» типов аргументов и результата.
Prisma

3) Те же приёмы для входных данных (create/update)

Можно выводить тип тела data из целевой операции:

type PostCreateData = Prisma.Args<typeof prisma.post, 'create'>['data']

async function createPost(data: PostCreateData) {
return prisma.post.create({ data })
}

Так вы избегаете ручных интерфейсов и дрейфа типов при изменении схемы.
Prisma

4) Prisma.validator vs satisfies

Если вы на новом генераторе prisma-client, Prisma.validator помечен как «legacy» — используйте satisfies (см. пример
выше). На старом генераторе prisma-client-js validator ещё доступен и применим в том же паттерне.
Prisma

Практические советы

Не Omit/Pick результат, а формируйте нужную форму через select/include — тогда тип синхронен с ответом БД.
Prisma

Выносите select/include в константы + satisfies, а тип результата получайте через *GetPayload<{ select/include:
typeof ... }> — меньше дублирования и полная проверка на этапе компиляции.
Prisma

Для обёрток и расширений предпочитайте Prisma.Args/Result/Exact — это самый надёжный способ связать аргументы и
возвращаемые типы.
Prisma

Если покажете ваш конкретный запрос/обёртку (например, post.findMany с парой вложенных include), я сразу дам «под вас»
готовый типизированный шаблон.
