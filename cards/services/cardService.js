const { find, findMyCards, findOneCard, create, update, like, remove } = require("../models/cardsDataAccessService");
const { validateCard, validateUpdatedCard } = require("../validations/cardValidationService");
const normalizeCard = require("../helpers/normalizeCard");
const { handleJoiError } = require("../../utils/errorhandler");

exports.getCards = async () => {
    try {
        const cards = await find();
        return Promise.resolve(cards);
    } catch (error) {
        return Promise.reject(error);
    }
};
//needs modification
exports.getMyCards = async (userId) => {
    try {
        const myCards = await findMyCards(userId);
        return Promise.resolve(myCards);
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.getOneCard = async (cardId) => {
    try {
        const card = await findOneCard(cardId);
        return Promise.resolve(card);
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.createCard = async (rawCard) => {
    try {
        const { error } = validateCard(rawCard);
        if (error) {
            return handleJoiError(error);
        }

        let card = await normalizeCard(rawCard);
        card = await create(card);
        return Promise.resolve(card);
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.updateCard = async (cardId, rawCard) => {
    try {
        const { error } = validateUpdatedCard(rawCard);
        if (error) {
            return handleJoiError(error);
        }

        let card = { ...rawCard };
        card = await update(cardId, card);
        return Promise.resolve(card);
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.likeCard = async (cardId, userId) => {
    try {
        const card = await like(cardId, userId);
        return Promise.resolve(card);
    } catch (error) {
        return Promise.reject(error);
    }
};


exports.deleteCard = async (cardId) => {
    try {
        const card = await remove(cardId);
        return Promise.resolve(card);
    } catch (error) {
        return Promise.reject(error);
    }
};
