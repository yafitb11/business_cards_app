const data = require("./initialData.json");
const normalizeUser = require("../users/helpers/normalizeUser");
const normalizeCard = require("../cards/helpers/normalizeCard");
const { createUser } = require("../users/models/usersDataAccessService");
const { create } = require("../cards/models/cardsDataAccessService");
const { generateUserPassword } = require("../users/helpers/bcrypt");
const chalk = require("chalk");

const generateInitialCards = async () => {
    const { cards } = data;
    cards.forEach(async (card) => {
        try {
            const userId = "6376274068d78742d84f31d2";
            const normalizedCard = await normalizeCard(card, userId);
            await create(normalizedCard);
        } catch (error) {
            return console.log(chalk.red(error.message));
        }
    });
};

const generateInitialUsers = async () => {
    const { users } = data;
    users.forEach(async (user) => {
        try {
            const normalizedUser = await normalizeUser(user);
            normalizedUser.password = generateUserPassword(normalizedUser.password);
            await createUser(normalizedUser);
        } catch (error) {
            return console.log(chalk.red(error.message));
        }
    });
};

module.exports = { generateInitialCards, generateInitialUsers };