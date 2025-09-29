const { find, findMyCards, findOneCard, create, update, like, remove, changeBizNumber } = require("../models/cardsDataAccessService");
const { validateCard, validateUpdatedCard, validateNewBizNumber } = require("../validations/cardValidationService");
const normalizeCard = require("../helpers/normalizeCard");
const normalizeUpdatedCard = require("../helpers/normalizeUpdatedCard");
const normalizeNewBizNumber = require("../helpers/normalizeNewBizNumber");
const { handleJoiError } = require("../../utils/errorhandler");

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

exports.createCard = async (rawCard, userId) => {
    try {
        const { error } = validateCard(rawCard);
        if (error) {
            return handleJoiError(error);
        }

        let card = await normalizeCard(rawCard, userId);
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

        let card = normalizeUpdatedCard(rawCard);
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


exports.changeCardBizNumber = async (cardId, newBizNumber) => {
    try {
        const { error } = validateNewBizNumber(newBizNumber);
        if (error) {
            return handleJoiError(error);
        }
        const bizNumber = await normalizeNewBizNumber(newBizNumber);
        const card = await changeBizNumber(cardId, bizNumber);
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
