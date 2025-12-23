# Stage 1: Build Stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependency files and install only production dependencies
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Copy the rest of the application source code
COPY . .

# Stage 2: Production Stage
FROM node:18-alpine

WORKDIR /app

# Create a non-root user and group
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy dependencies and source code from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server.js ./server.js

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Change ownership of the files to the non-root user
USER appuser

# Command to run the application
CMD ["node", "server.js"]