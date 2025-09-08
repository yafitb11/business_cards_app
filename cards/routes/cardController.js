const express = require("express");
const router = express.Router();
const chalk = require("chalk");
const { getCards, getMyCards, getOneCard, createCard, updateCard, likeCard, deleteCard } = require("../services/cardService");
const { errorhandler } = require("../../utils/errorhandler");

router.get("/", async (req, res) => {
    try {
        const cards = await getCards();
        return res.send(cards);
    } catch (error) {
        errorhandler(res, error.status || 500, error.message);
    }
});


router.get("/my-cards", async (req, res) => {
    try {
        const userId = "1234";
        const cards = await getMyCards(userId);
        return res.send(cards);
    } catch (error) {
        errorhandler(res, error.status || 500, error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const card = await getOneCard(id);
        res.send(card);
    } catch (error) {
        errorhandler(res, error.status || 500, error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const card = await createCard(req.body);
        return res.status(201).send(card);
    } catch (error) {
        errorhandler(res, error.status || 500, error.message);
    }
});


router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const card = await updateCard(id, req.body);
        res.send(card);
    } catch (error) {
        errorhandler(res, error.status || 500, error.message);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const cardId = req.params.id;
        const userId = "123456";
        const card = await likeCard(cardId, userId);
        res.send(card);
    } catch (error) {
        errorhandler(res, error.status || 500, error.message);
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const card = await deleteCard(id);
        res.send(card);
    } catch (error) {
        errorhandler(res, error.status || 500, error.message);
    }
});

module.exports = router;