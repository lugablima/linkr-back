import { Router } from "express";
import { getPosts } from "../controllers/postsController.js";
import getTrending from "../controllers/trendingController.js";
import validateToken from "../middlewares/authValidator.js";

const hashtagsRouter = Router();

hashtagsRouter.get("/trending", validateToken, getTrending);
hashtagsRouter.get("/hashtag/:hashtag", validateToken, getPosts);

export default hashtagsRouter;
