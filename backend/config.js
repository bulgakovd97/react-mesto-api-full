require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const jwtSecret = NODE_ENV === 'production' ? JWT_SECRET : 'jwt-dev';

module.exports = {
  jwtSecret,
};
