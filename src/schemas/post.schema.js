import Joi from "joi";

export const postSchema = Joi.object({
  image: Joi.string().uri().required(),
  content: Joi.string().required(),
});
