#!/bin/bash

# Function to start Docker Compose
start_docker_compose() {
  echo "Starting Docker Compose..."
  docker-compose up -d --build
}

# Function to run yarn start for webui
start_webui() {
  echo "Starting webui..."
  yarn webui:start --host
}

# Function to run yarn start for server
start_server() {
  echo "Starting server..."
  yarn server:start
}

# Main script execution
start_docker_compose
start_webui &
start_server
