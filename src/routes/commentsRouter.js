import { Router } from "express";

import validateToken from "../middlewares/authValidator.js";
import validateSchema from "../middlewares/schemaValidator.js";
import commentSchema from "../schemas/commentsSchema.js";
import { getComments, commentPost } from "../controllers/commentsController.js";

const commentsRouter = Router();

commentsRouter.get("/comments/:postId", validateToken, getComments);
commentsRouter.post("/comments", validateToken, validateSchema(commentSchema), commentPost);

export default commentsRouter;
