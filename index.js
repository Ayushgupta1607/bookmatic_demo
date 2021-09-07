import express from "express";
import http from "https";
import dotenv from "dotenv";
import routes from "./startup/routes.js";
import morgan from "morgan";
import cors from "cors";
dotenv.config();
const app = express();
// for morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);

routes(app);

const PORT_NO = process.env.PORT_NO;
app.listen(
  PORT_NO,
  console.log(`Server is running at ${PORT_NO} in ${process.env.NODE_ENV} mode`)
);
