import joi from "joi";

const commentSchema = joi.object({
  postId: joi.number().integer().positive().required(),
  comment: joi.string().trim().required(),
});

export default commentSchema;
