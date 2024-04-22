FROM node:18-alpine as build

WORKDIR /app

COPY ./ /app/admin-fe

RUN npm install

RUN npm run build



FROM nginx:alpine

COPY --from=build /app/dist/admin-fe /usr/share/nginx/html

EXPOSE 4200