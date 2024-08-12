const Joi = require('joi');

const validateRegister = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    emailId: Joi.string().required().email(),
    password: Joi.string().required().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/),
  });
  return schema.validate(data);
}

const validateLogin = (data) => {
  const schema = Joi.object({
    emailId: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(data);
};

module.exports = {
  validateRegister,
  validateLogin
};