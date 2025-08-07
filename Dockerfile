FROM node:22-alpine AS deps

WORKDIR /app
COPY package*.json ./
RUN npm install

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# 1. Создаём пользователя
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 2. Копируем файлы
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# 3. Копируем .next/standalone + .next/static с нужными правами
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 4. [!] Создаём директорию .next/cache, если нужно
RUN mkdir -p .next && chown -R nextjs:nodejs .next

# 5. Обеспечиваем права на /app (рабочая директория)
RUN chown -R nextjs:nodejs /app

# 6. Переключаемся на безопасного пользователя
USER nextjs

EXPOSE 3000

# Старт сервера (уже в standalone-сборке)
CMD HOSTNAME="0.0.0.0" node server.js


## 🔁 Проксирование через Traefik (Coolify)
#LABEL traefik.enable="true"
#LABEL traefik.http.routers.next.rule="Host(`ay-petry.ru`)"
#LABEL traefik.http.routers.next.entrypoints="https"
#LABEL traefik.http.routers.next.tls.certresolver="letsencrypt"
#LABEL traefik.http.services.next.loadbalancer.server.port="3000"
#
#CMD ["npm", "start"]
