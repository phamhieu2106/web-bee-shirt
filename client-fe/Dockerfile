FROM node:18-alpine as build

WORKDIR /app/client-fe

COPY ./node_modules /app/client-fe

COPY ./ /app/client-fe

RUN npm install -g @angular/cli@16.1.8

RUN npm install

RUN npm run build



FROM nginx:alpine

COPY --from=build /app/client-fe/dist/client-fe /usr/share/nginx/html

EXPOSE 4201
