import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
const env = process.env;

const config = {
  db: {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  },
};
export const query = async (sql, params) => {
  const connection = await mysql.createConnection(config.db);
  const [results] = await connection.execute(sql, params);
  return results;
};
