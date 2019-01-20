require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const { formatError } = require('apollo-errors');

const server = createServer();

// TODO Use express middlware to handle cookies (JWT)
// TODO Use express middlware to populate current user

server.start(
  {
    formatError,
  },
  ({ port }) => {
    console.log(`Server is running on port ${port}`);
  }
);
