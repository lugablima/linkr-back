import { Router } from "express";
import { checkFollowing, checkUserFollowsSomeone, follow, unfollow } from "../controllers/followsController.js";

import validateToken from "../middlewares/authValidator.js";

const followsRouter = Router();

followsRouter.post("/follows/:id", validateToken, follow);
followsRouter.delete("/follows/:id", validateToken, unfollow);
followsRouter.post("/following/:id", validateToken, checkFollowing);
followsRouter.post("/follow/", validateToken, checkUserFollowsSomeone);

export default followsRouter;
