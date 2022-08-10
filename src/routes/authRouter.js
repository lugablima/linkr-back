import { Router } from "express";

import { createUser, login } from "../controllers/authController.js";
import validateSchema from "../middlewares/schemaValidator.js";

import signUpSchema from "../schemas/signUpSchema.js";
import loginSchema from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signUpSchema), createUser);
authRouter.post("/", validateSchema(loginSchema), login);

export default authRouter;
