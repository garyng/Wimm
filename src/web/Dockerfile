FROM node:10-alpine as base
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --output-path=./dist/

FROM nginx:1.15-alpine as publish
COPY --from=base /app/dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
