const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const NoAccessError = require('../errors/NoAccessError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NoAccessError('Необходимо авторизоваться');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (err) {
    throw new NoAccessError('Необходимо авторизоваться');
  }

  req.user = payload;

  return next();
};

module.exports = { auth };
