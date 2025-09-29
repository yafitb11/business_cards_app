const bizNumberChecker = require("./bizNumberChecker");
const { handleBadRequest } = require("../../utils/errorhandler");
const lodash = require("lodash");

const generateBizNumber = async () => {
    const random = lodash.random(1000000, 9000000);
    try {
        const card = await bizNumberChecker(random);
        if (card) { return generateBizNumber(); }
        return random;
    } catch (error) {
        return handleBadRequest("generateBizNumber", error);
    }
};

module.exports = generateBizNumber;