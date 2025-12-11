# For Building the React App - node:20-alpine || node:18-apline 
FROM node:20-alpine AS builder

# create a folder app 
WORKDIR /app

# Copy ONLY package files first (better caching)
COPY package*.json ./

RUN npm install 

# copy source code from your host to machine i.e., Copy the full project
COPY . .

# Build the production bundle
RUN npm run build

# For Serving the Built React App - nginx:alpine
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy build output to nginx html folder/ public directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose nginx port 80
EXPOSE 80

# Start nginx server
CMD [ "nginx", "-g", "daemon off;" ]



