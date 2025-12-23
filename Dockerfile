# Stage 1: Builder/Test stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install all dependencies (including devDependencies)
COPY package*.json ./
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Run tests to ensure application is working
RUN npm test

# Stage 2: Production stage
FROM node:18-alpine

WORKDIR /app

# Create a non-root user and group for better security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only production dependencies from the builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy application code and package.json
COPY --from=builder /app/package.json ./
COPY --from=builder /app/server.js ./

# Switch to the non-root user
USER appuser

EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]
