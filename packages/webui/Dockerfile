# Use the official Node.js image as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package.json yarn.lock ./

# Install the dependencies
RUN yarn

# Copy the rest of the application code to the container
COPY . .

# Build the TypeScript code
RUN yarn build

# Expose the port that your server listens on
EXPOSE 4173 

# Command to run your server
CMD ["vite preview"]
