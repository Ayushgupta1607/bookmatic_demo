import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import {
  createNewTransaction,
  getAllTransaction,
  getTransactionById,
  updateTransaction,
} from "../models/transaction.model.js";
export const createTransaction = asyncHandler(async (req, res) => {
  const user_id = req.user.id;
  const transaction_id = uuidv4();
  const amount = req.validData.amount;
  const transaction_type = "recieved";
  const party_name = req.validData.party_name;

  const data = {
    user_id: user_id,
    transaction_id: transaction_id,
    amount: amount,
    transaction_type: transaction_type,
    party_name: party_name,
  };
  const result = await createNewTransaction(data);

  if (result) {
    res
      .status(200)
      .json({ success: true, data, message: "transaction created" });
  }
});

export const completeTranscation = asyncHandler(async (req, res) => {
  const user_id = req.user.id;
  const transaction_id = req.query.transaction_id;
  const isExist = await getTransactionById(user_id, transaction_id);
  if (!isExist.length) {
    res.status(400);
    throw new Error("Transaction does not exist");
  }
  const result = await updateTransaction(transaction_id);

  if (result) {
    res.status(200).json({
      message: "transaction updated successfully",
    });
  } else {
    throw new Error("transaction update Failed");
  }
});

export const getAll = asyncHandler(async (req, res) => {
  const user_id = req.user.id;

  const transactions = await getAllTransaction(user_id);
  res.status(200).json({ success: true, data: transactions });
});
