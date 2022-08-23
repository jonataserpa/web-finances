
FROM node:16.13.2-buster-slim AS builder

WORKDIR /app

COPY package*.json /app/
RUN npm install

ARG VITE_APP_STAGING
ENV VITE_APP_STAGING $VITE_APP_STAGING

ARG VITE_APP_BACKEND_URL
ENV VITE_APP_BACKEND_URL $VITE_APP_BACKEND_URL

COPY ./ /app/
RUN npm run build

FROM nginx:1.21.1-alpine

# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*
# COPY --from=builder /app/build .

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]