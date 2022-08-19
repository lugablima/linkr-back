import { Router } from "express";
import getHashtags from "../controllers/hashtagsController.js";
import getTrending from "../controllers/trendingController.js";
import validateToken from "../middlewares/authValidator.js";

const hashtagsRouter = Router();

hashtagsRouter.get("/trending", validateToken, getTrending);
hashtagsRouter.get("/hashtag/:hashtag/:offset", validateToken, getHashtags);

export default hashtagsRouter;
