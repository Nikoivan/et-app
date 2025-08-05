# Используем Node.js 22
FROM node:22-alpine
  
  # Рабочая директория внутри контейнера
WORKDIR /app
  
  # Копируем package.json и package-lock.json
COPY package*.json ./
  
  # Устанавливаем зависимости
RUN npm install
  
  # Копируем остальной код
COPY . .
  
  # Сборка проекта
RUN npm run build
  
  # Устанавливаем переменные окружения
ENV NODE_ENV=production
ENV PORT=3000
  
  # Пробрасываем порт
EXPOSE 3000
  
  # Команда запуска
CMD ["npm", "start"]
