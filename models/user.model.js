import * as db from "../startup/db.js";
import { emptyOrRows } from "../utils/helper.js";
export const createUser = async (fields) => {
  const user_id = fields.user_id;
  const first_name = fields.first_name;
  const last_name = fields.last_name;
  const username = fields.username;
  const password = fields.password;
  const result = await db.query(
    `INSERT INTO user (user_id,first_name,last_name,username,password) VALUES (?,?,?,?,?)`,
    [user_id, first_name, last_name, username, password]
  );
  let success = false;

  if (result.affectedRows) {
    return true;
  }
  return false;
};

export const getAccountByUsername = async (username) => {
  const result = await db.query(` SELECT * from user WHERE username= ?`, [
    username,
  ]);
  const data = emptyOrRows(result);
  return data;
};

export const getAccountByID = async (id) => {
  const result = await db.query(` SELECT * from user WHERE user_id= ?`, [id]);
  const data = emptyOrRows(result);
  return data;
};
