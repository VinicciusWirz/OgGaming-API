import Joi from "joi";

const userInfo = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().min(6).max(11).required(),
  email: Joi.string().email().required(),
  bio: Joi.string().max(200).required(),
  birthday: Joi.optional(),
});

const userPfp = Joi.object({
  image: Joi.string(),
});

const userSchema = { userInfo, userPfp };
export default userSchema;
