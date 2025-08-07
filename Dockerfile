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

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# копируем всё, что нужно для запуска
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

## Set the correct permission for prerender cache
#RUN mkdir .next
#RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD HOSTNAME="0.0.0.0" node server.js

## 🔁 Проксирование через Traefik (Coolify)
#LABEL traefik.enable="true"
#LABEL traefik.http.routers.next.rule="Host(`ay-petry.ru`)"
#LABEL traefik.http.routers.next.entrypoints="https"
#LABEL traefik.http.routers.next.tls.certresolver="letsencrypt"
#LABEL traefik.http.services.next.loadbalancer.server.port="3000"
#
#CMD ["npm", "start"]
