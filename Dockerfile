# Frontend Dockerfile - Bun + Vite + Nginx
FROM oven/bun:1 AS base

# Dependencies stage
FROM base AS deps
WORKDIR /app
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

# Build stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build arguments for environment variables
ARG VITE_API_URL
ARG VITE_WS_URL

# Set build-time environment variables
ENV NODE_ENV=production
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_WS_URL=${VITE_WS_URL}

# Build the application
RUN bun run build

# Production stage with Nginx
FROM nginx:alpine AS runner

# Remove default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static files
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .

# Ensure Nginx runs in foreground and logs to stdout/stderr
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

# Expose port 80 for Coolify
EXPOSE 80

# Health check for Coolify
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:80/health || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
