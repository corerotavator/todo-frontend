# Use the official Node.js image as the base image
FROM node:14 AS build-env
WORKDIR /app

ENV ASPNETCORE_ENVIRONMENT=Development #Add this line.

# Copy package.json and package-lock.json, and install dependencies
COPY package*.json ./
RUN npm install

# Copy the source files and build the project
COPY . ./
RUN npm run build

# Use the official Nginx image for the final image
FROM nginx:1.21
COPY --from=build-env /app/dist/todo-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf