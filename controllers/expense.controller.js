const Expense = require('../models/expenses.model');
const ProjectData = require('../models/project.model');

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
    const newExpense = await Expense.create(expenseData);

    // Update the project with the new Expense ID
    const updatedProject = await ProjectData.findOneAndUpdate(
      { _id: expenseData.pid },
      { $push: { expenses: newExpense._id } },
      { new: true }
    );

    if (!updatedProject) {
      // If the project is not found, handle accordingly
      return res.status(404).json({ error: 'Project not found' });
    }

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
    const result = await Expense.findOneAndDelete({ expid: dId });

    if (result) {
      // Update the ProjectData model by pulling the Expense ID from the array
      const updatedProject = await ProjectData.findOneAndUpdate(
        { expenses: result._id },
        { $pull: { expenses: result._id } },
        { new: true }
      );

      if (updatedProject) {
        res.status(200).json({ message: 'Expense deleted successfully.' });
      } else {
        res.status(404).json({ message: 'Project not found or expense already deleted.' });
      }
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
