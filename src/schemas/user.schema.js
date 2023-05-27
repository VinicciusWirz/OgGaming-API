import Joi from "joi";

const userInfo = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().max(11).required(),
  email: Joi.string().email().required(),
  bio: Joi.string().max(200).required(),
  birthday: Joi.string().optional(),
});

const userPfp = Joi.object({
  image: Joi.string(),
});

const userSchema = { userInfo, userPfp };
export default userSchema;
