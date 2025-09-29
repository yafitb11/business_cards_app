const validateCardWithJoi = require("./joi/validateCardWithJoi");
const validateUpdatedCardWithJoi = require("./joi/validateUpdatedCardWithJoi");
const validateNewBizNumberWithJoi = require("./joi/validateNewBizNumberWithJoi");
const config = require("config");
const validator = config.get("VALIDATOR") || "Joi";

const validateCard = (card) => {
    if (validator === "Joi") {
        return validateCardWithJoi(card);
    }
}

const validateUpdatedCard = (card) => {
    if (validator === "Joi") {
        return validateUpdatedCardWithJoi(card);
    }
}

const validateNewBizNumber = (newBizNumber) => {
    if (validator === "Joi") {
        return validateNewBizNumberWithJoi(card);
    }
}


module.exports = { validateCard, validateUpdatedCard, validateNewBizNumber };