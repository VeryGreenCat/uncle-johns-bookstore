# Use Node.js official image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire project
COPY . .

# Build Next.js app
RUN npm run build

# Use a lightweight image for production
FROM node:18-alpine AS runner
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Set the environment variable for production
ENV NODE_ENV=production

# Start the Next.js app
CMD ["node", ".next/standalone/server.js"]
