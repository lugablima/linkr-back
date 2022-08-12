import { Router } from "express";

import { getLikes, likePost, dislikePost } from "../controllers/likesController.js";
import validateToken from "../middlewares/authValidator.js";
import validateSchema from "../middlewares/schemaValidator.js";

import likeSchema from "../schemas/likesSchema.js";

const likesRouter = Router();

likesRouter.get("/likes/:postId", validateToken, getLikes);
likesRouter.post("/likes", validateToken, validateSchema(likeSchema), likePost);
likesRouter.delete("/likes/:postId", validateToken, dislikePost);

export default likesRouter;
