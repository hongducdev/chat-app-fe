FROM node:18 as build
WORKDIR /app
COPY . .
RUN node -v
RUN npm install
RUN npm run build

## run stage ##
FROM nginx:alpine
COPY --from=build /app/dist /app/dist
COPY nginx.conf /etc/nginx/nginx.conf
