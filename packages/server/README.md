
```markdown
# OpenStock Inventory Management System

OpenStock is an inventory management system built with Apollo Server, Prisma ORM, and PostgreSQL. It allows you to manage parts in your inventory.

## Prerequisites

Before running the project, ensure that you have the following dependencies installed:

- Node.js (v14 or higher)
- PostgreSQL database
# optional
- Docker & Docker Compose

## Getting Started

1. Clone the repository:

```shell
git clone https://github.com/AlecJDavidson/open-stock-api
```

2. Install the project dependencies:

```shell
npm install
# or
yarn install
```

3. Set up the PostgreSQL database:
   - Make sure your PostgreSQL database server is running.
   - Update the database connection details in the `.env` file.

4. Set up the Prisma ORM:
   - Run the database migration to create the necessary tables:

   ```shell
   npm run migrate
   # or
   yarn migrate
   ```

   - Seed the database with example data (optional):

   ```shell
   npm run seed:db
   # or
   yarn seed:db
   ```

5. Build the project:

```shell
npm run build
# or
yarn build
```

6. Start the Apollo Server:

```shell
npm start
# or
yarn start
```

7. The server should now be running at `http://localhost:4000`. You can access the GraphQL Playground to interact with the API.

## Available Scripts

- `npm run build`: Build the TypeScript project.
- `npm start`: Start the Apollo Server.
- `npm run migrate`: Run database migration with Prisma.
- `npm run seed:db`: Seed the database with example data.
- `npm run start:db`: Start the PostgreSQL database server using Docker Compose.
- `npm run stop:db`: Stop the PostgreSQL database server.

## License

This project is licensed under the [MIT License](LICENSE).

```
