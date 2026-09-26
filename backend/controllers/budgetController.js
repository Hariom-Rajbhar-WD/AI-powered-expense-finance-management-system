 import Budget from "../models/Budget.js";

export const createBudget = async (req, res) => {
  try {
    const {
      category,
      amount,
      month,
      year
    } = req.body;

    const budget = await Budget.create({
      user: req.user.id,
      category,
      amount,
      month,
      year
    });

    res.status(201).json(budget);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({
      user: req.user.id
    }).sort({
      createdAt: -1
    });

    res.json(budgets);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!budget) {
      return res.status(404).json({
        message: "Budget not found"
      });
    }

    res.json({
      message: "Budget deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};