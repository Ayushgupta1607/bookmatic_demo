import jwt from "jsonwebtoken";
import { getAccountByID } from "../models/user.model.js";

export const auth = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    let token;

    if (authToken && authToken.startsWith("Bearer ")) {
      token = authToken.substring(7, authToken.length);
    } else {
      res.sendStatus(403);
    }

    let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded.id) {
      const validated = await getAccountByID(decoded.id);

      if (validated.length === 0) {
        throw new Error("Unauthorized");
      }
      req.user = { id: decoded.id, username: decoded.username };
      next();
    } else {
      throw new Error("Unauthorized");
    }
  } catch (err) {
    res.json({ status: 0, data: null, msg: "Token Invalid" });
  }
};
