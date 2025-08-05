FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=0 /app/public ./public
COPY --from=0 /app/.next/standalone ./
COPY --from=0 /app/.next/static ./.next/static
COPY --from=0 /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "server.js"]
