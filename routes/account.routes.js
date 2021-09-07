import express from "express";
import { login, register } from "../controllers/account.controller.js";
import { validate } from "../middlewares/Validation.middleware.js";
import { loginDataSchema, registerDataSchema } from "../utils/validation.js";
const route = express.Router();

route.post("/register", validate(registerDataSchema), register);
route.post("/login", validate(loginDataSchema), login);
export default route;
