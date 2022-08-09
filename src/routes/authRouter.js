import { Router } from "express";
import { login } from "../controllers/authController.js";
import { validateSchema } from "../middlewares/schemaValidator.js" 
import loginSchema from "../schemas/authSchema.js";


const authrouter = Router();

authrouter.post('/', validateSchema(loginSchema), login);

export default authrouter;
