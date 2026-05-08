# Build stage
FROM node:24-alpine AS builder

WORKDIR /app
# Copy package files
COPY package.json package-lock.json ./
# Install dependencies
RUN npm ci
# Copy source code
COPY . .
# Build application
RUN npm run build

# Production stage
FROM node:24-alpine

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy package files
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

# Start application
CMD ["node", "dist/main"]