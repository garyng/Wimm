FROM node:10-alpine as base
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --output-path=./dist/

FROM base as dev
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--poll", "10"]

FROM nginx:1.15-alpine as publish
COPY --from=base /app/dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /app
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.0/wait ./wait
COPY entrypoint.sh .
RUN chmod +x ./wait && \
  chmod +x ./entrypoint.sh
ENTRYPOINT [ "./entrypoint.sh" ]
CMD [ "nginx", "-g", "daemon off;" ]
