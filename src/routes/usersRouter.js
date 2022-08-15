import { Router } from "express";

import validateToken from "../middlewares/authValidator.js";
import getUsers from "../controllers/usersController.js";

const usersRouter = Router();

usersRouter.get("/users/:username", validateToken, getUsers);

export default usersRouter;
