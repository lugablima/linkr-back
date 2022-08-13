import joi from "joi";

const likeSchema = joi.object({
  postId: joi.number().integer().positive().required(),
});

export default likeSchema;
