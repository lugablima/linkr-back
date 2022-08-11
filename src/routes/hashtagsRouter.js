import { Router } from "express";
import { validateToken } from "../middlewares/authValidator.js";

const hashtagsRouter = Router();

hashtagsRouter.get("/hashtag/:hashtag", validateToken);

export default hashtagsRouter;
