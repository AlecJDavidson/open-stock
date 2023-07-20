# OpenStock - Parts Inventory Management System

OpenStock is a parts inventory management system designed to help individuals manage their personal projects efficiently. Whether you're a hobbyist or a DIY enthusiast, OpenStock simplifies the process of organizing and tracking parts for your various projects.

## How to Run the Code

### Prerequisites

Before running OpenStock, make sure you have the following installed on your system:

- Node.js
- Yarn (optional, but recommended for package management)
- Docker & Docker Compose (optional, but recommended for running local db)

### Setting Up the Database

You can use Docker to simplify the database setup. From the root directory, run the following command:

```bash
cp .base.env .env ### You'll probably want to change the values in here.
docker-compose up -d ### This will pull the latest image from PostgreSQL in docker hub and start it up.
```

This will start a PostgreSQL database with the credentials provided in the `.env` file.

### Initializing the Database

After the database is up and running, follow these steps to initialize it:

1. Navigate to the `packages/server` directory.
2. Run the following commands in sequence:

```bash
yarn generate
yarn migrate
yarn db:seed
```

These commands will generate Prisma, create the initial database migration, and seed some sample data. You can modify the data as needed.

### Starting the Server

To start the server, execute the following command from the root directory:

```bash
yarn server:start
```

This will run the server locally on port 4000.

### Starting the Web User Interface

To preview the production build of the front-end, use the following command:

```bash
yarn webui:start
```

For development mode, run:

```bash
yarn webui:start dev
```

This will start the web user interface to interact with your parts inventory.

## License

OpenStock is a personal project and is provided under the MIT License. You can find more information in the `LICENSE` file.


Enjoy using OpenStock for managing your parts inventory! 
