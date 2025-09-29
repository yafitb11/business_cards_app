const generateBizNumber = require("./generateBizNumber");
const bizNumberChecker = require("./bizNumberChecker");
const { handleBadRequest } = require("../../utils/errorhandler");
const { Error } = require("mongoose");

const normalizeNewBizNumber = async (newBizNumber) => {
    try {
        if (newBizNumber === "" || !newBizNumber) {
            return await generateBizNumber();
        }
        const isOccupied = await bizNumberChecker(newBizNumber);
        if (isOccupied) { throw new Error("bizNumber already exists"); }
        return newBizNumber
    } catch (error) {
        return handleBadRequest("normalizeNewBizNumber", error);
    }
};

module.exports = normalizeNewBizNumber;