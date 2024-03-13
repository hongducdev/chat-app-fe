FROM node:18 as build
WORKDIR /app
COPY package*.json ./
# RUN npm cache clean --force
RUN npm install -g npm@latest
# RUN npm config set registry https://registry.npmjs.org/
# RUN npm config set strict-ssl false
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
