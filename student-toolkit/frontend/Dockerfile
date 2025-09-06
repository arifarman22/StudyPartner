# Frontend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all frontend files
COPY . .

# Expose React/Vite dev server port
EXPOSE 3000

# Start the frontend
CMD ["npm", "run", "dev", "--", "--host"]
