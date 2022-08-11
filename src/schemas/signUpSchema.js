import joi from "joi";

const signUpSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().trim().required(),
  username: joi.string().trim().required(),
  pictureURL: joi.string().uri().required(),
});

export default signUpSchema;
