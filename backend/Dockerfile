# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Generate Prisma client
RUN npx prisma generate

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# Run migrations
RUN npx prisma migrate deploy

# Set environment variables for Railway deployment
ENV NODE_ENV=production
ENV PORT=3000

# Expose your app port (change if needed)
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]