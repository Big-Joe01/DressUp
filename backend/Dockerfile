FROM node:20-alpine AS development

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=development /app/dist ./dist
COPY --from=development /app/prisma ./prisma

EXPOSE 4000

CMD ["node", "dist/main"]
