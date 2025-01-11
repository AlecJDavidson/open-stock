# Use Node image for building
FROM node:16 as builder

# Install Yarn and dependencies including TypeScript
RUN npm install -g yarn --force && npm install -g typescript

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY . ./
RUN yarn install

# Expose port 80
EXPOSE 3051 

# Start Nginx
CMD ["yarn", "start", "--host"]
