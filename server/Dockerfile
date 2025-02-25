# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /server

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose the backend port
EXPOSE 4000

# Start the backend server
CMD ["npm", "start"]
