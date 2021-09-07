import * as db from "../startup/db.js";
import { emptyOrRows } from "../utils/helper.js";
export const createNewTransaction = async (fields) => {
  const result = await db.query(
    `INSERT INTO transaction (transaction_id,user_id,amount,transaction_type,party_name) VALUES (?,?,?,?,?)`,
    [
      fields.transaction_id,
      fields.user_id,
      fields.amount,
      fields.transaction_type,
      fields.party_name,
    ]
  );
  if (result.affectedRows) {
    return true;
  }
  return false;
};

export const getAllTransaction = async (user_id) => {
  const result = await db.query(`SELECT * FROM transaction WHERE user_id=?`, [
    user_id,
  ]);
  return emptyOrRows(result);
};

export const getTransactionById = async (user_id, transaction_id) => {
  const result = await db.query(
    `SELECT * FROM transaction WHERE user_id=? AND transaction_id=?`,
    [user_id, transaction_id]
  );
  return emptyOrRows(result);
};

export const updateTransaction = async (transaction_id) => {
  const result = await db.query(
    `UPDATE transaction SET transaction_type=1 WHERE transaction_id=?`,
    [transaction_id]
  );
  if (result.affectedRows) {
    return true;
  }
  return false;
};
