FROM node:16.13.2-buster-slim

COPY package*.json ./

RUN apk add --no-cache bash

RUN npm install -g @nestjs/cli@8.0.0

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]

USER node

# WORKDIR /home/node/app
WORKDIR /usr/src/app






