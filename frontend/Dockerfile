FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 3000

# Start the application with development mode
CMD ["npm", "run", "dev", "--", "--port", "3000", "--hostname", "0.0.0.0"]