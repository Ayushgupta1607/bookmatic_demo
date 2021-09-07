import express from "express";
import {
  completeTranscation,
  createTransaction,
  getAll,
} from "../controllers/transaction.controller.js";
import { auth } from "../middlewares/Auth.middleware.js";
import { validate } from "../middlewares/Validation.middleware.js";
import { createTranactionSchema } from "../utils/validation.js";
const route = express.Router();

route.use(auth);
route.post("/create", validate(createTranactionSchema), createTransaction);
route.get("/getAll", getAll);
route.patch("/update", completeTranscation);
export default route;
