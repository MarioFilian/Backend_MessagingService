# -------- STAGE 1: BUILD --------
FROM node:20-alpine AS build

# Set working directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy the rest of the application source code
COPY . .

# -------- STAGE 2: RUNTIME --------
FROM node:20-alpine

# Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set secure working directory for production
WORKDIR /app

# Copy built app from previous stage
COPY --from=build /usr/src/app /app

# Switch to non-root user
USER appuser

# Expose the application port
EXPOSE 3001

# Start the application
CMD ["node", "index.js"]
