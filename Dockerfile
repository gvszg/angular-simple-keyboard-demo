FROM node:10.16.3 AS node-builder
WORKDIR /app
COPY . .
RUN npm i yarn
RUN yarn global add @angular/cli@latest
RUN yarn install
RUN ng build --prod="true"

FROM nginx:alpine
COPY --from=node-builder /app/dist/angular-simple-keyboard /usr/share/nginx/html
COPY --from=node-builder /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
