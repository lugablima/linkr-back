import { Router } from "express";

import { getPosts, createPost } from "../controllers/postsController.js";
import validateSchema from "../middlewares/schemaValidator.js";
import validateToken from "../middlewares/authValidator.js";

import postSchema from "../schemas/postsSchema.js";

const postsRouter = Router();

postsRouter.get("/posts", validateToken, getPosts);
postsRouter.post("/posts", validateToken, validateSchema(postSchema), createPost);

export default postsRouter;
