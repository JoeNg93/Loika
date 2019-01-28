require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const { formatError } = require('apollo-errors');

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const server = createServer();

// Use express middlware to populate current user
// Decode JWT to get user id per each request
server.express.use((req, res, next) => {
  const token = req.headers.Authorization;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // put the userId onto the req for future requests to access
    req.userId = userId;
  }
  next();
});

server.start(
  {
    formatError,
  },
  ({ port }) => {
    console.log(`Server is running on port ${port}`);
  }
);
