const { find, findMyCards, findOneCard, create, update, like, remove } = require("../models/cardsDataAccessService");
const validateCard = require("../validations/cardValidationService");
const normalizeCard = require("../helpers/normalizeCard");

exports.getCards = async () => {
    try {
        const cards = await find();
        return Promise.resolve(cards);
    } catch (error) {
        return Promise.reject(error);
    }
};

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
            return Promise.reject(error);
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
