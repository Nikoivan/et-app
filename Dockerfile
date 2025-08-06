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

# копируем всё, что нужно для запуска
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

# 🔁 Проксирование через Traefik (Coolify)
LABEL traefik.enable="true"
LABEL traefik.http.routers.next.rule="Host(`ay-petry.ru`)"
LABEL traefik.http.routers.next.entrypoints="https"
LABEL traefik.http.routers.next.tls.certresolver="letsencrypt"
LABEL traefik.http.services.next.loadbalancer.server.port="3000"

CMD ["npm", "start"]
