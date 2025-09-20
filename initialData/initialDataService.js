const data = require("./initialData.json");
const normalizeUser = require("../users/helpers/normalizeUser");
const normalizeCard = require("../cards/helpers/normalizeCard");
const { createUser, find: findPrevUsers } = require("../users/models/usersDataAccessService");
const { create, find: findPrevCards } = require("../cards/models/cardsDataAccessService");
const { generateUserPassword } = require("../users/helpers/bcrypt");
const chalk = require("chalk");

const generateInitialCards = async () => {
    const previousCards = await findPrevCards();
    if (previousCards.length == 0) {
        const { cards } = data;
        try {
            await Promise.all(cards.map(async (card) => {
                const userId = "6376274068d78742d84f31d2";
                const normalizedCard = await normalizeCard(card, userId);
                await create(normalizedCard);
            }));
            console.log(chalk.green("Initial cards created successfully"));
        } catch (error) {
            return console.log(chalk.red(error.message));
        }

    } else {
        console.log(chalk.blue("Cards already exist, skipping initial data creation"));
    }
};


const generateInitialUsers = async () => {
    const previousUsers = await findPrevUsers();
    if (previousUsers.length == 0) {
        const { users } = data;
        try {
            await Promise.all(users.map(async (user) => {
                const normalizedUser = await normalizeUser(user);
                normalizedUser.password = generateUserPassword(normalizedUser.password);
                await createUser(normalizedUser);
            }));
            console.log(chalk.green("Initial users created successfully"));
        } catch (error) {
            return console.log(chalk.red(error.message));
        }

    } else {
        console.log(chalk.blue("Users already exist, skipping initial data creation"));
    }
};

module.exports = { generateInitialCards, generateInitialUsers };