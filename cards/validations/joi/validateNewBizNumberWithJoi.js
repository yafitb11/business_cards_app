const Joi = require("joi");

const validateNewBizNumberWithJoi = (newBizNumber) => {
    const schema = Joi.object({
        bizNumber: Joi.number().allow(""),
    }).unknown(false);

    return schema.validate(newBizNumber);
};

module.exports = validateNewBizNumberWithJoi;