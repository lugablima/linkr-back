import joi from "joi";

const postSchema = joi.object({
  link: joi.string().uri().required(),
  description: joi.string().trim().allow("").required(),
});

export default postSchema;
