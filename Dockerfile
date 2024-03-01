## build stage ##
FROM node:18.18-alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

## run stage ##
FROM nginx
EXPOSE 80
EXPOSE 4953
COPY --from=builder /app/build /usr/share/nginx/html
