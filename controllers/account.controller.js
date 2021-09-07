import { v4 as uuidv4 } from "uuid";
import asyncHandler from "express-async-handler";
import { createUser, getAccountByUsername } from "../models/user.model.js";
import {
  comparePassword,
  encryptPassword,
  generateToken,
} from "../utils/helper.js";

export const register = asyncHandler(async (req, res) => {
  const user_id = uuidv4();
  const username = req.validData.username;
  const userExist = await getAccountByUsername(username);
  const first_name = req.validData.first_name;
  const last_name = req.validData.last_name;
  const password = await encryptPassword(req.validData.password);

  if (userExist.length) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const data = {
    user_id: user_id,
    username: username,
    first_name: first_name,
    last_name: last_name,
    password: password,
  };
  const result = await createUser(data);

  if (result) {
    res.status(200).json({
      success: true,
      user: {
        id: data.user_id,
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
      },
      message: "User registered successfully",
    });
  } else {
    res.status(400);
    throw new Error("Error while creating an account");
  }
});

export const login = asyncHandler(async (req, res) => {
  const username = req.validData.username;
  const password = req.validData.password;
  const user = await getAccountByUsername(username);
  if (user.length === 0) {
    res.status(400);
    throw new Error("User Not Exist");
  }
  const isMatch = await comparePassword(password, user[0].password);

  const token = await generateToken({
    id: user[0].user_id,
    username: user[0].username,
  });

  if (isMatch) {
    res.status(200).json({
      success: true,
      token,
      user: {
        user_id: user[0].user_id,
        first_name: user[0].first_name,
        last_name: user[0].last_name,
        username: user[0].username,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid Password");
  }
});
