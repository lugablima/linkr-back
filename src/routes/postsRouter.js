import { Router } from "express";

import { deletePost, getNewsPosts, getPosts, getUserPosts, createPost, updatePost } from "../controllers/postsController.js";
import validateSchema from "../middlewares/schemaValidator.js";
import validateToken from "../middlewares/authValidator.js";

import postSchema from "../schemas/postsSchema.js";

const postsRouter = Router();

postsRouter.delete("/posts/:postId", validateToken, deletePost);
postsRouter.get("/posts", validateToken, getNewsPosts);
postsRouter.get("/posts/:offset", validateToken, getPosts);
postsRouter.get("/posts/:userId/:offset", validateToken, getUserPosts);
postsRouter.post("/posts", validateToken, validateSchema(postSchema), createPost);
postsRouter.put("/posts/:postId", validateToken, validateSchema(postSchema), updatePost);

export default postsRouter;
