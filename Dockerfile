
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

FROM node:16.13.2-buster-slim AS builder
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8081
CMD ["npm", "run", "dev"]