const Expense = require('../models/expenses.model');


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
const getAllExpenses = async (req, res) => {
    try {
      const expenses = await Expense.find();
      res.status(200).json({ expenses });
    } catch (error) {
      console.error('Error fetching expenses:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  




module.exports = {
    getAllExpenses,

  addExpense,
 
};
