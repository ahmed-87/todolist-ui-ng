#STAGE 1
FROM node:13.10.1-alpine3.10 as build-step

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
RUN npm install

# Bundle app source
COPY . .


RUN  npm run build

#STAGE 2
FROM nginx:1.17.9 as prod-step

COPY --from=build-step /usr/src/app/dist/todolist-ui-ng /usr/share/nginx/html

#EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
