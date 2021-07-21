const jwt = require('jsonwebtoken');

const NoAccessError = require('../errors/NoAccessError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NoAccessError('Необходимо авторизоваться');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    const { JWT_SECRET } = process.env;

    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new NoAccessError('Необходимо авторизоваться');
  }

  req.user = payload;

  return next();
};

module.exports = { auth };
