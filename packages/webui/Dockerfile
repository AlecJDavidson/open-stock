# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install the dependencies
RUN yarn install

# Install TypeScript globally
RUN yarn global add typescript

# Install Vite globally
RUN yarn global add vite

# Copy the rest of the application code to the container
COPY . .

ENV PORT=5173

# Build the TypeScript code
RUN yarn build

# Expose the port that your server listens on
EXPOSE 5173 

# Command to run your server
CMD ["yarn", "start"]
