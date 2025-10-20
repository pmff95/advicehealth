# ---------------- stage 1: Build the app ----------------
FROM node:22-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy only dependency files first (for better build cache)
COPY package*.json ./

# Install dependencies using npm ci (faster and reproducible)
RUN npm ci --silent

# Copy all source files
COPY . .

# Build the production-ready app
RUN npm run build


# ---------------- stage 2: Serve with Nginx ----------------
FROM nginx:1.25-alpine AS runtime

# Remove default Nginx configuration
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/app.conf

# Copy the built app from the builder stage to the Nginx public directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
