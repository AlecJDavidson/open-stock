# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if applicable) to the container
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install -g yarn --force && npm install -g typescript

# Bundle app source inside Docker image
COPY . .

RUN yarn

# Build your TypeScript code
RUN npm run build

# DB has to be running for this to work
# RUN yarn generate
# RUN yarn migrate -n "init"
# RUN yarn seed:db

# Expose the port the app runs on
EXPOSE 3050 

# Define the command to run the server
CMD ["yarn", "start"]
