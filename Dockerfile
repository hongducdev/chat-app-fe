FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@latest
RUN npm install
COPY . .
RUN npm run build

## run stage ##
FROM nginx
COPY --from=build /app/dist /app/dist
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
