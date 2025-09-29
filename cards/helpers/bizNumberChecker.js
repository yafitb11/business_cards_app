const Card = require("../models/mongodb/Card");
const { handleBadRequest } = require("../../utils/errorhandler");

const checkBizNumber = async (bizNumber) => {
    try {
        const card = await Card.findOne({ bizNumber: bizNumber });
        if (card) { return true }
        else { return false }
    } catch (error) {
        return handleBadRequest("bizNumberChecker", error);
    }
};

module.exports = checkBizNumber;