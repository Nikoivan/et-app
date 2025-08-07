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

# 2. Копируем standalone сборку
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# 3. Копируем public рядом с server.js
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# 4. Копируем .next/static
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 5. Копируем зависимости и package.json
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

# 6. Создаем .next (если нужно) и выдаем права
RUN mkdir -p .next && chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

CMD HOSTNAME="0.0.0.0" node server.js
