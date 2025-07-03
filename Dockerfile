# Use an official Node.js runtime as a parent image
FROM node:22.0.0

# Set the working directory to /kltn-frontend
WORKDIR /kltn-frontend

# Copy only package.json and package-lock.json first to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 5174 to the outside world
EXPOSE 5174

# Run the app in development mode
CMD ["npm", "run", "dev"]