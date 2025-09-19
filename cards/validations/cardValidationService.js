const validateCardWithJoi = require("./joi/validateCardWithJoi");
const validateUpdatedCardWithJoi = require("./joi/validateUpdatedCardWithJoi");
const validator = undefined || "Joi";

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

module.exports = { validateCard, validateUpdatedCard };