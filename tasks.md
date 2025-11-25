обычный 1-на-1 чат,

real-time слой,

систему оффлайн-уведомлений (email/SMS/push).

Ниже — как я бы это спроектировал на Next.js 16 + Prisma + Postgres и где посмотреть живые примеры.

1. Бэкенд-модель (Prisma + Postgres)

Минимальный набор таблиц:

User — ваши пользователи (админ и клиенты).

Conversation — диалог (всегда 2 участника: admin + user).

ConversationParticipant — связь кто в каком диалоге (полезно, если потом захотите группы).

Message — сообщения.

Notification (или хотя бы поля вроде lastNotifiedAt) — чтобы не спамить письмами/СМС.

Пример схемы Prisma (идея, не копипастить вслепую):

model User {
id String @id @default(cuid())
email String @unique
phone String? @unique
role UserRole @default(USER) // USER | ADMIN
conversations ConversationParticipant[]
messages Message[]
lastSeenAt DateTime?
}

model Conversation {
id String @id @default(cuid())
createdAt DateTime @default(now())
participants ConversationParticipant[]
messages Message[]
}

model ConversationParticipant {
id String @id @default(cuid())
conversation Conversation @relation(fields: [conversationId], references: [id])
conversationId String
user User @relation(fields: [userId], references: [id])
userId String
}

model Message {
id String @id @default(cuid())
conversation Conversation @relation(fields: [conversationId], references: [id])
conversationId String
sender User @relation(fields: [senderId], references: [id])
senderId String
body String
createdAt DateTime @default(now())
readAt DateTime?
}

Особенность: для «администратор всегда один из участников» вы просто создаёте Conversation с
участниками [adminId, userId] и делаете уникальный индекс на пару (adminId, userId), если нужно по одному диалогу на
пару.

2. Real-time слой для Next.js 16
   Вариант А: Pusher / Ably / Supabase Realtime (управляемый сервис)

Плюсы: не паритесь с WebSocket-сервером, хорошо дружит с Next.js и serverless.
Минусы: внешний платный сервис (после бесплатного тарифа).

Пример: тут Next.js 13 + Prisma + Supabase + Pusher — прям готовый мессенджер (он очень близок к тому, что вам нужно,
просто адаптируете под 1-на-1 и Postgres).
MarshalCode

Суть:

Для каждой Conversation создаёте канал, например conversation-{id}.

При записи сообщения в БД (через Prisma в API route или Server Action) делаете pusher.trigger('conversation-123', '
new-message', { ... }).

Клиент подписан на этот канал и в реальном времени получает сообщения.

Вариант B: отдельный WebSocket/Socket.IO сервер

Вы поднимаете отдельный Node-сервис (не внутри Next.js, а рядом) с Socket.IO и стучитесь в него из фронта. Бэкенд (API
Next.js или тот же Socket.IO) пишет в Postgres через Prisma.

Пример: полный стек Next.js + Node.js + Socket.io + PostgreSQL + Prisma + Tailwind — видео-гайд по продакшн-чату.
DEV Community

Когда это выгодно:

у вас уже есть свой Node-бэкенд,

нужен полный контроль над WebSocket-логикой, rate-limit и т.п.

3. Отслеживание онлайна/оффлайна

Чтобы понимать, нужно ли отправлять письмо/СМС:

Присутствие через WebSocket

При подключении клиента по WebSocket/Pusher вы помечаете пользователя online.

При дисконнекте — online = false и обновляете lastSeenAt.

В Pusher/Ably есть «presence channels», которые уже дают список онлайн-юзеров.

На минималках — только lastSeenAt

Каждый раз, когда юзер совершает действие (любой запрос к API чата), обновляете lastSeenAt = now().

Считаете, что пользователь оффлайн, если now() - lastSeenAt > X минут.

В логике отправки уведомления вы просто проверяете статус получателя: если он оффлайн — ставите задачу на отправку
уведомления.

4. Оффлайн-уведомления: email, SMS, push

Главная идея — развязать отправку сообщений и уведомлений через очередь/фоновый воркер, чтобы:

не тормозить ответ API,

не слать по одному письму на каждое сообщение.

Поток событий

Админ пишет пользователю (или наоборот).

API:

пишет Message в Postgres (prisma.message.create),

триггерит real-time событие (Pusher/Socket.io),

проверяет, оффлайн ли получатель и не было ли ему недавно уведомления.

Если нужно — создаёт запись Notification или пушит event в очередь (Redis/BullMQ, например).

Воркер (отдельный процесс или Cron):

берёт несформированные нотификации,

отправляет email/SMS/push,

помечает Notification как доставленную.

Email

Используйте любой transactional email сервис:

Resend, Postmark, SendGrid, AWS SES — все нормально работают с Node/Next.

В них есть официальные примеры для Next.js.

SMS / звонки / WhatsApp

Готовые API:

Vonage (ex-Nexmo) — есть пример чата на Next.js + Prisma + GraphQL, который шлёт SMS-уведомления через Vonage.
Vonage API Developer

Twilio — аналогично, куча примеров.

Вы сценарно делаете так:

Если у пользователя есть phone и стоит флажок «слать SMS» — формируете короткое сообщение типа «У вас новое сообщение от
администратора. Откройте ссылку: …».

Push-уведомления

Если у вас будет мобильное приложение или PWA:

можете использовать Firebase Cloud Messaging или OneSignal,

хранить у пользователя pushToken и слать пуш при новом непрочитанном сообщении.

Анти-спам (обязательно!)

Введите cooldown, например не слать больше 1 письма/СМС на диалог чаще чем раз в 5–10 минут.

Опционально: первая нотификация «у вас есть новые сообщения в чате», а дальше — тишина, пока пользователь не зайдет и не
прочитает.

5. UX-детали именно для консультаций

Поскольку у вас онлайн-консультации, а не «болталка»:

У диалога стоит хранить статус: OPEN / CLOSED / PENDING,
чтобы админ понимал, какие консультации активны.

Можно хранить subject (тема) у Conversation, если нужно.

История сообщений хранится в Postgres и может использоваться для аналитики, обучения моделей и т.п.

6. Готовые примеры, на которые стоит посмотреть

Полноценный чат на Next.js + Prisma + PostgreSQL
Репозиторий chat-app с Next.js, React Query, Prisma и Postgres. Там реализованы список пользователей, создание диалога,
просмотр истории и отправка сообщений/картинок.
GitHub

Realtime чат на Next.js + Pusher + Prisma + Supabase
Тут аккуратно показано, как встраивать Pusher для real-time обновлений сообщений и онлайн-статуса. Очень хороший
ориентир по архитектуре именно для Next.js.
MarshalCode

Next.js чат с SMS-уведомлениями (Vonage)
Статья «Building a realtime GraphQL chat application with SMS notifications» — Next.js + Prisma на бэке + Vonage API для
SMS. Прямой пример, как привязывать SMS к новым сообщениям.
Vonage API Developer

Next.js + Node + Socket.io + PostgreSQL/Prisma
Тут показан вариант с отдельным Socket.io-бэкендом и Postgres, если хотите полный контроль над WebSocket-слоем.
DEV Community

7. С чего начать прямо сейчас

Если кратко и по шагам:

Добить схему Prisma (User, Conversation, Participant, Message, Notification, индексы).

Сделать обычный «не realtime» API:

POST /api/conversations — создать диалог user+admin,

GET /api/conversations — список диалогов для текущего юзера,

GET /api/conversations/[id]/messages — история,

POST /api/conversations/[id]/messages — отправка.

Навесить Pusher/Ably или Socket.io, чтобы сообщения приходили в реальном времени.

Добавить offline-логику:

флаг онлайн/оффлайн, lastSeenAt,

сервис уведомлений (email) с cooldown, потом — SMS.

Уже потом — красота: статус «оператор печатает», атачи, markdown и прочее.

Если хочешь, в следующем сообщении могу сделать для тебя конкретную схему Prisma и API-контроллеры под твой текущий
проект (Next 16 + App Router) и показаться, как именно повесить логику «если пользователь оффлайн — ставим задачу на
email/SMS».
