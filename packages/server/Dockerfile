# Use the official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package.json ./

# Install the dependencies
RUN yarn install

# Install Prisma globally
RUN yarn global add prisma

# Install TypeScript globally
RUN yarn global add typescript


# Copy the rest of the application code to the container
COPY . .

# Build the TypeScript code
RUN yarn build
RUN yarn generate
RUN yarn migrate
RUN yarn seed:db

# Expose the port that your server listens on
EXPOSE 4000

# Command to run your server
CMD ["yarn", "start"]
