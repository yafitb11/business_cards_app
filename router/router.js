const express = require("express");
const router = express.Router();
const cardsController = require("../cards/routes/cardController");
const usersController = require("../users/routes/userController");
const errorhandler = require("../utils/errorhandler");

router.use("/cards", cardsController);
router.use("/users", usersController);
router.use((req, res) => { errorhandler(res, 404, "page not found") });

module.exports = router;