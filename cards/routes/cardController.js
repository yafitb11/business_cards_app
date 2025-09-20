const express = require("express");
const router = express.Router();
const chalk = require("chalk");
const { getCards, getMyCards, getOneCard, createCard, updateCard, likeCard, deleteCard } = require("../services/cardService");
const { errorhandler } = require("../../utils/errorhandler");
const { auth } = require("../../auth/authService");

router.get("/", async (req, res) => {
    try {
        const cards = await getCards();
        return res.send(cards);
    } catch (error) {
        return errorhandler(res, error.status || 500, error.message);
    }
});


router.get("/my-cards", async (req, res) => {
    try {
        const userId = "1234";
        const cards = await getMyCards(userId);
        return res.send(cards);
    } catch (error) {
        return errorhandler(res, error.status || 500, error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const card = await getOneCard(id);
        res.send(card);
    } catch (error) {
        return errorhandler(res, error.status || 500, error.message);
    }
});

router.post("/", auth, async (req, res) => {
    try {
        const { _id, isBusiness } = req.user;
        console.log(_id);
        if (!isBusiness) {
            return errorhandler(res, 403, "Authorization Error: Must be a Business user!");
        }
        const card = await createCard(req.body, _id);
        return res.status(201).send(card);
    } catch (error) {
        return errorhandler(res, error.status || 500, error.message);
    }
});


router.put("/:id", auth, async (req, res) => {
    try {
        const cardId = req.params.id;
        const card1 = await getOneCard(cardId);
        if (!card1) {
            return errorhandler(res, 404, "Card not found");
        }
        const userId = card1.user_id.toString();
        const { _id } = req.user;
        if (_id !== userId) {
            return errorhandler(res, 403, "Authorization Error: Must be the user who created the card!");
        }

        const card = await updateCard(cardId, req.body);
        res.send(card);
    } catch (error) {
        return errorhandler(res, error.status || 500, error.message);
    }
});

router.patch("/:id", auth, async (req, res) => {
    try {
        const { _id } = req.user;
        if (!_id) {
            return errorhandler(res, 403, "Authorization Error: Must be a registered user!");
        }
        const cardId = req.params.id;
        const card = await likeCard(cardId, _id);
        res.send(card);
    } catch (error) {
        return errorhandler(res, error.status || 500, error.message);
    }
});


router.delete("/:id", auth, async (req, res) => {
    try {
        const cardId = req.params.id;
        const card1 = await getOneCard(cardId);
        if (!card1) {
            return errorhandler(res, 404, "Card not found");
        }
        const userId = card1.user_id.toString();
        const { _id, isAdmin } = req.user;
        if (!isAdmin && _id !== userId) {
            return errorhandler(res, 403, "Authorization Error: Must be the user who created the card or Admin!");
        }
        const card = await deleteCard(cardId);
        res.send(card);
    } catch (error) {
        return errorhandler(res, error.status || 500, error.message);
    }
});

module.exports = router;