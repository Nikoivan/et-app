FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --frozen-lockfile

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Копируем всё приложение
COPY --from=builder /app ./

# Создаём папку для картинок и даём права
RUN mkdir -p /app/public/images && chown -R node:node /app/public/images

# Запускаем под обычным пользователем
USER node

CMD ["npm", "start"]
