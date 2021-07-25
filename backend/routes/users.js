const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { auth } = require('../middlewares/auth');
const regex = require('../utils/utils');

const {
  // getUsers,
  // getUser,
  getUserMe,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

// userRouter.get('/users', auth, getUsers);

userRouter.get('/users/me', auth, getUserMe);

// userRouter.get('/users/:userId', auth, celebrate({
//   params: Joi.object().keys({
//     userId: Joi.string().alphanum().length(24),
//   }).unknown(true),
// }), getUser);

userRouter.patch('/users/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
}), updateUserInfo);

userRouter.patch('/users/me/avatar', auth, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regex),
  }).unknown(true),
}), updateUserAvatar);

module.exports = userRouter;
