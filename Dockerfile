
# FROM node:16.13.2-buster-slim AS builder

# WORKDIR /app

# COPY package*.json /app/
# RUN npm install

# ARG VITE_APP_STAGING
# ENV VITE_APP_STAGING $VITE_APP_STAGING

# ARG VITE_APP_BACKEND_URL
# ENV VITE_APP_BACKEND_URL $VITE_APP_BACKEND_URL

# COPY ./ /app/
# RUN npm run build

# # FROM nginx:1.21.1-alpine

# # COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# # WORKDIR /usr/share/nginx/html
# # RUN rm -rf ./*
# # COPY --from=builder /app/build .

# # EXPOSE 8081

# CMD ["nginx", "-g", "daemon off;"]

# FROM node:16.13.2-alpine AS builder
# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install
# COPY . .

# EXPOSE 3000
# CMD ["npm", "run", "dev", "mock"]

FROM node:16.13.2-alpine
# RUN addgroup app && adduser -S -G app app
# RUN mkdir /app && chown app:app /app
# USER app
# WORKDIR /app
# COPY --chown=app:app . .
# ENV PATH /app/node_modules/.bin:$PATH
# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install -g npm@8.19.1
# RUN npm install --force
# COPY . ./
# CMD ["npm", "run", "dev", "mock"]

# Diretório de trabalho(é onde a aplicação ficará dentro do container).
WORKDIR /app
# Adicionando `/app/node_modules/.bin` para o $PATH
ENV PATH /app/node_modules/.bin:$PATH
# Instalando dependências da aplicação e armazenando em cache.
COPY package.json /app/package.json
RUN npm install -g npm@8.19.1 --unsafe-perm=true --allow-root
RUN npm install --force
# Inicializa a aplicação
CMD ["npm", "run", "dev", "mock"]