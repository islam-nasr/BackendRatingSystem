const Joi = require("joi");

const createValidation = request => {
  const createSchema = {
    name: Joi.string().required(),
    attributes: [{
      name: Joi.string().required(),
      weight: Joi.number().required()
    }
    ]
  };
  return Joi.validate(request, createSchema);
};

const idValidation = request => {
  const idSchema = {
    id:Joi.number().required().min(1)
  };
  return Joi.validate(request,idSchema);
}

module.exports = {
  createValidation,
  idValidation
};