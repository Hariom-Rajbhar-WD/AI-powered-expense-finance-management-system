 import Expense from "../models/Expense.js";

export const createExpense = async (req, res) => {
  try {
    const {
      title,
      amount,
      category,
      description,
      date
    } = req.body;

    if (!title || !amount || !category) {
      return res.status(400).json({
        message: "Title, amount and category are required"
      });
    }

    const expense = await Expense.create({
      user: req.user.id,
      title,
      amount,
      category,
      description,
      date: date || Date.now()
    });

    res.status(201).json(expense);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.user.id
    }).sort({
      date: -1
    });

    res.json(expenses);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    res.json({
      message: "Expense deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};