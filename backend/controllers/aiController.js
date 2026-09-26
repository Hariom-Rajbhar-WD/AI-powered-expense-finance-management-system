 import Expense from "../models/Expense.js";

export const askAI = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        message: "Question is required"
      });
    }

    const expenses = await Expense.find({
      user: req.user.id
    });

    if (expenses.length === 0) {
      return res.json({
        answer:
          "You don't have any expenses yet. Add some expenses first so I can analyze your spending."
      });
    }

    const total = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    const categoryTotals = {};

    expenses.forEach((expense) => {
      if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] = 0;
      }

      categoryTotals[expense.category] += expense.amount;
    });

    const highestCategory = Object.entries(
      categoryTotals
    ).sort((a, b) => b[1] - a[1])[0];

    let answer = "";

    const lowerQuestion = question.toLowerCase();

    if (
      lowerQuestion.includes("most") ||
      lowerQuestion.includes("highest")
    ) {
      answer = `Your highest spending category is ${highestCategory[0]} with ₹${highestCategory[1].toFixed(2)}.`;
    } else if (
      lowerQuestion.includes("total") ||
      lowerQuestion.includes("spend")
    ) {
      answer = `Your total recorded expenses are ₹${total.toFixed(2)}.`;
    } else if (
      lowerQuestion.includes("save")
    ) {
      answer = `Your current total spending is ₹${total.toFixed(2)}. Consider reducing spending in ${highestCategory[0]}, which is currently your highest expense category.`;
    } else {
      answer = `You have spent ₹${total.toFixed(2)} in total. Your highest spending category is ${highestCategory[0]} at ₹${highestCategory[1].toFixed(2)}.`;
    }

    res.json({
      answer,
      total,
      categoryTotals
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};