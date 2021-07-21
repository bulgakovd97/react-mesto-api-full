const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const NotValidError = require('../errors/NotValidError');
const AuthorizationError = require('../errors/AuthorizationError');
const EmailExistsError = require('../errors/EmailExistsError');

const getUsers = (req, res, next) => {
  User.find()
    .then((users) => res.send({ users }))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }

      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotValidError('Переданы некорректные данные');
      }

      return next(err);
    })
    .catch(next);
};

const getUserMe = (req, res, next) => {
  const { _id } = req.user;

  User.findOne({ _id }).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }

      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotValidError('Переданы некорректные данные');
      }

      return next(err);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then(hash => {
      if (!password) {
        throw new NotValidError('Пароль не введён');
      }

      return User.create({
        email,
        password: hash,
        name,
        about,
        avatar,
      })
        .then((user) => res.status(200).send({
          user: {
            email,
            name,
            about,
            avatar,
          },
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new NotValidError('Переданы некорректные данные');
          } else if (err.name === 'MongoError' && err.code === 11000) {
            throw new EmailExistsError('Пользователь с таким Email уже существует');
          }

          next(err);
        });
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }

      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new NotValidError('Переданы некорректные данные');
      }

      return next(err);
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }

      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new NotValidError('Переданы некорректные данные');
      }

      return next(err);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then(user => {
      const { NODE_ENV, JWT_SECRET } = process.env;

      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      return res.send({ token });
    })
    .catch(err => {
      throw new AuthorizationError('Неправильная почта или пароль');
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  getUserMe,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
};
