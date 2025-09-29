const generateBizNumber = require("./generateBizNumber");

const normalizeNewBizNumber = async (newBizNumber) => {
    if (newBizNumber === "" || !newBizNumber) {
        return await generateBizNumber();
    }
    else { }
};

module.exports = normalizeNewBizNumber;