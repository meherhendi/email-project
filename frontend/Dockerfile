# # Stage 1: Build the Angular app
# FROM node:18 as build

# WORKDIR /app

# # Copy the package.json and package-lock.json files
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application files
# COPY . .

# # Build the Angular app
# RUN npm run build --prod

# # Stage 2: Serve the Angular app with Nginx
# FROM nginx:1.21.0

# # Copy the built Angular app from the previous stage
# COPY --from=build /app/dist/email-project-frontend /usr/share/nginx/html

# # Copy the custom Nginx configuration
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Expose port 80 for the Nginx server
# EXPOSE 80

# # Start the Nginx server
# CMD ["nginx", "-g", "daemon off;"]

#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/email-project-frontend /usr/share/nginx/html