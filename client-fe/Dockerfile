FROM node:18-alpine as build

WORKDIR /app

COPY ./ /app/client-fe

RUN npm install

RUN npm run build



FROM nginx:alpine

COPY --from=build /app/dist/client-fe /usr/share/nginx/html

EXPOSE 4201