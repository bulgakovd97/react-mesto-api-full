const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const { celebrate, Joi, errors } = require('celebrate');

const helmet = require('helmet');

const regex = require('./utils/utils');

const app = express();

const userRouter = require('./routes/users');

const cardRouter = require('./routes/cards');

const { login, createUser } = require('./controllers/users');

const { auth } = require('./middlewares/auth');

const { errorHandler } = require('./middlewares/errorHandler');

const NotFoundError = require('./errors/NotFoundError');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { corsHandler } = require('./middlewares/corsHandler');

const { PORT = 3005 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(corsHandler);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }).unknown(true),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regex),
  }).unknown(true),
}), createUser);

app.use(requestLogger);

app.use(helmet());

app.use('/', auth, userRouter);

app.use('/', auth, cardRouter);

app.use(errorLogger);

app.use(errors());

app.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errorHandler);

app.listen(PORT);
