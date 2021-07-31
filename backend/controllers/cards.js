const NoAccessError = require('../errors/NoAccessError');
const NotFoundError = require('../errors/NotFoundError');
const NotValidError = require('../errors/NotValidError');

const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find()
    .then(cards => {
      res.send(cards);
    })
    .catch(err => next(err));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then(card => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new NotValidError('Переданы некорректные данные при создании карточки');
      }

      return next(err);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then(card => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      } else if (!card.owner.equals(req.user._id)) {
        throw new NoAccessError('Нельзя удалить чужую карточку!');
      }

      return Card.deleteOne({ _id: card._id })
        .then(card => {
          res.status(200).send(card);
        })
        .catch(next);
    })
    .catch(err => {
      if (err.name === 'CastError') {
        throw new NotValidError('Переданы некорректные данные');
      }

      return next(err);
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then(card => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }

      res.send(card);
    })
    .catch(err => {
      if (err.name === 'CastError') {
        throw new NotValidError('Переданы некорректные данные');
      }

      return next(err);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(card => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }

      res.send(card);
    })
    .catch(err => {
      if (err.name === 'CastError') {
        throw new NotValidError('Переданы некорректные данные');
      }

      return next(err);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
