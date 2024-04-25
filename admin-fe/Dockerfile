FROM node:18-alpine as build

WORKDIR /app/admin-fe

COPY ./node_modules /app/admin-fe

COPY ./ /app/admin-fe

RUN npm install -g @angular/cli@16.1.8

RUN npm install

RUN npm run build



FROM nginx:alpine

COPY --from=build /app/dist/admin-fe /usr/share/nginx/html

EXPOSE 4200
