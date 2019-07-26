# Build stage
FROM node:11-alpine as build-stage
LABEL maintainer="Rick Bennett <rbennett1106@gmail.com>"
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn run build

# Production stage
FROM nginx:1.14.2-alpine as production-stage
LABEL maintainer="Rick Bennett <rbennett1106@gmail.com>"
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh
EXPOSE 80
ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]