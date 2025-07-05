FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY ./src ./src
COPY .env ./

EXPOSE 3026

CMD ["node", "src/index.js"]
