import express from "express";
import { notFound, errorHandler } from "../middlewares/Error.middleware.js";

import accountRoutes from "../routes/account.routes.js";
import transactionRoutes from "../routes/transaction.routes.js";
const routes = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/v1/user", accountRoutes);
  app.use("/api/v1/transaction", transactionRoutes);
  app.use(notFound);
  app.use(errorHandler);
};

export default routes;
