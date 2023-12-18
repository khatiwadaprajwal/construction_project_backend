
const Expense = require('../models/expenses.model');
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json({ expenses });
  } catch (error) {
    console.error('Error fetching expenses:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getExpenseById = async (req, res) => {
  const eId = req.params.eId;

  try {
    const expense = await Expense.findOne({ expid: eId });

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.status(200).json({ expense });
  } catch (error) {
    console.error('Error finding expense by ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addExpense = async (req, res) => {
  const expenseData = req.body;

  try {
    console.log(expenseData); 
    const newExpense = await Expense.create(expenseData);
    res.status(201).json({ message: 'Expense created successfully.', expense: newExpense });
  } catch (error) {
    console.error('Error creating expense:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateExpenseById = async (req, res) => {
  const uId = req.params.uId;
  const updatedExpenseData = req.body;

  try {
    const result = await Expense.findOneAndUpdate({ expid: uId }, { $set: updatedExpenseData }, { new: true });

    if (result) {
      res.status(200).json({ message: 'Expense updated successfully.', expense: result });
    } else {
      res.status(404).json({ message: 'Expense not found.' });
    }
  } catch (error) {
    console.error('Error updating expense by ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteExpenseById = async (req, res) => {
  const dId = req.params.dId;

  try {
    const result = await Expense.deleteOne({ expid: dId });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Expense deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Expense not found or could not be deleted.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting expense by ID:', message: error.message });
  }
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  addExpense,
  updateExpenseById,
  deleteExpenseById,
};
