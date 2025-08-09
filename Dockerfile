# Этап 1 — зависимости
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --production=false

# Этап 2 — билд
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Этап 3 — запуск
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Копируем всё, кроме node_modules (они отдельно)
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=deps /app/node_modules ./node_modules

# Создаём пользователя и настраиваем права
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs \
  && chown -R nextjs:nodejs /app

CMD ["npm", "start"]
