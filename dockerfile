# Use an official Node.js image as a base
FROM node:20-alpine3.20

# Set the working directory to /app
WORKDIR /app

# Init npm first
RUN npm init -y

# Install CURL for health check
RUN apk --no-cache add curl

# Copy the package*.json files
COPY package*.json ./

# Install dependencies
# RUN npm install
RUN npm ci --only-production

# Copy the rest of the application code
COPY . . 
# COPY .[^node_modules] ./

# Build the js distro
RUN npm run build

# Expose the port the application will use
# EXPOSE 3001

# Run the command to start the application
CMD ["npm", "run", "start"]