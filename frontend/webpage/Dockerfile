# Use Node.js image to build the React app
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's code
COPY . .

# Build the app for production
RUN npm run build

# Use NGINX to serve the static files
FROM nginx:alpine

# Copy the build output to NGINX's public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
