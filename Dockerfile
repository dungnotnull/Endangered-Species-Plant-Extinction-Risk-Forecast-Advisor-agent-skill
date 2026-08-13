# Multi-stage Dockerfile for Endangered Species Forecast Advisor
# Optimized for production deployment

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Copy source code
COPY . .

# Build TypeScript (if applicable)
RUN npm run build || echo "No build step configured"

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache \
    curl \
    ca-certificates \
    && addgroup -g 1001 -S nodejs \
    && adduser -S nodejs -u 1001

# Copy built files from builder
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./
COPY --from=builder --chown=nodejs:nodejs /app/tsconfig.json ./
COPY --from=builder --chown=nodejs:nodejs /app/src ./src
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/README.md ./

# Create necessary directories
RUN mkdir -p /app/logs /app/data /app/config

# Set permissions
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:3000/api/v1/health || exit 1

# Start application
CMD ["node", "src/index.js"]

# Stage 3: Development (optional)
FROM node:20-alpine AS development

WORKDIR /app

# Install all dependencies (including dev)
RUN apk add --no-cache curl git

COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start development server
CMD ["npm", "run", "dev"]
