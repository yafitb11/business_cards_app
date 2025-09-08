const Card = require("../models/mongodb/Card");
const { handleBadRequest } = require("../../utils/errorhandler");
const config = require("config");
const DB = config.get("DB") || "MONGODB";

exports.find = async () => {
    if (DB === "MONGODB") {
        try {
            const cards = await Card.find();
            return Promise.resolve(cards);
        } catch (error) {
            error.status = 404;
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve("Cards Not From MONGODB");
};
//not modified
exports.findMyCards = async (userId) => {
    if (DB === "MONGODB") {
        try {
            return Promise.resolve(`my cards: ${userId}`);
        } catch (error) {
            error.status = 404;
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve("Card Not From MONGODB");
};

exports.findOneCard = async (cardId) => {
    if (DB === "MONGODB") {
        try {
            const card = await Card.findById(cardId);
            if (!card) { throw new Error("Could not find card in database"); }
            return Promise.resolve(card);
        } catch (error) {
            error.status = 404;
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve("Card Not From MONGODB");
};


exports.create = async (normalizedCard) => {
    if (DB === "MONGODB") {
        try {
            let card = new Card(normalizedCard);
            card = await card.save();
            return Promise.resolve(card);
        } catch (error) {
            error.status = 400;
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve("createCard not in mongodb");
};


exports.update = async (cardId, normalizeCard) => {
    if (DB === "MONGODB") {
        try {
            const updatedCard = await Card.findByIdAndUpdate(cardId, normalizeCard, { new: true });
            if (!updatedCard) { throw new Error("Could not update this card because a card with this ID couldn't be found in database"); }
            return Promise.resolve(`updated card: ${updatedCard}`);
        } catch (error) {
            error.status = 404;
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve("Card Not From MONGODB");
};

exports.like = async (cardId, userId) => {
    if (DB === "MONGODB") {
        try {
            let card = await Card.findById(cardId);
            if (!card) { throw new Error("Could not change card likes because a card with this ID couldn't be found in database"); }

            const cardLikes = card.likes.find((id) => id === userId);
            card.likes = cardLikes ? card.likes.filter(id => id !== userId) : [...card.likes, userId];
            card = await card.save();
            return Promise.resolve(`card after likes change: ${card}`);
        } catch (error) {
            error.status = 404;
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve("Card Not From MONGODB");
};

exports.remove = async (cardId, user) => {
    if (DB === "MONGODB") {
        try {
            let removedCard = await Card.findById(cardId);
            if (!removedCard) { throw new Error("Could not delete this card because a card with this ID couldn't be found in database"); }

            /*    if (!user.isAdmin && user._id !== removedCard.user_id) throw new Error(
                    "Authorization Error: Only the user who created the business card or admin can delete this card"
                ); */

            removedCard = await Card.findByIdAndDelete(cardId);
            return Promise.resolve(`removed card: ${removedCard}`);
        } catch (error) {
            error.status = 404;
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve("Card Not From MONGODB");
};