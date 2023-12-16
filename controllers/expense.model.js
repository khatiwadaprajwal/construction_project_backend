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





module.exports = {

  addExpense,
 
};
