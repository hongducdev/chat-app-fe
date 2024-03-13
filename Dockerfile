# FROM node:18 as build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install -g npm@latest
# RUN npm install
# COPY . .
# RUN npm run build

## run stage ##
# FROM nginx
# COPY --from=build /app/dist /app/dist
# COPY nginx.conf /etc/nginx/nginx.conf
# EXPOSE 80

# Start Nginx when the container runs
# CMD ["nginx", "-g", "daemon off;"]

FROM oven/bun:1 as base
WORKDIR /app
COPY package*.json ./
RUN bun install
COPY . .
RUN bun run build

FROM nginx
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]