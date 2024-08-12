const Joi = require('joi');

exports.validateEmail = (data) => {
  const schema = Joi.object({
    to: Joi.array().items(Joi.string().required()).required(),
    cc: Joi.array().items(Joi.string().optional()),
    bcc: Joi.array().items(Joi.string().optional()),
    subject: Joi.string().min(1).optional().allow(""),
    body: Joi.string().min(1).optional().allow(""),
    attachment: Joi.string().optional().allow(""),
    type: Joi.string().valid('high', 'low', 'normal', 'spam').default('normal')
  });
  return schema.validate(data);
};
