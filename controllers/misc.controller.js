const MiscExpense = require('../models/misc.model');

const addMiscExpense = async (req, res) => {
  const miscExpenseData = req.body;

  try {
    console.log(miscExpenseData); // Check the output in your console
    const newMiscExpense = await MiscExpense.create(miscExpenseData);
    res.status(201).json({ message: 'Miscellaneous expense added successfully.', miscExpense: newMiscExpense });
  } catch (error) {
    console.error('Error adding miscellaneous expense:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getMiscExpenseById = async (req, res) => {
  const miscId = req.params.miscId;

  try {
    const miscExpense = await MiscExpense.findOne({ misid: miscId });

    if (!miscExpense) {
      return res.status(404).json({ error: 'Miscellaneous expense not found' });
    }

    res.status(200).json({ miscExpense });
  } catch (error) {
    console.error('Error finding miscellaneous expense by ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllMiscExpenses = async (req, res) => {
  try {
    const miscExpenses = await MiscExpense.find();
    res.status(200).json({ miscExpenses });
  } catch (error) {
    console.error('Error fetching miscellaneous expenses:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateMiscExpense = async (req, res) => {
  const miscId = req.params.miscId;
  const updatedMiscExpenseData = req.body;

  try {
    const result = await MiscExpense.findOneAndUpdate({ misid: miscId }, { $set: updatedMiscExpenseData }, { new: true });

    if (result) {
      res.status(200).json({ message: 'Miscellaneous expense updated successfully.', miscExpense: result });
    } else {
      res.status(404).json({ message: 'Miscellaneous expense not found.' });
    }
  } catch (error) {
    console.error('Error updating miscellaneous expense by ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteMiscExpense = async (req, res) => {
  const miscId = req.params.miscId;

  try {
    const result = await MiscExpense.deleteOne({ misid: miscId });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Miscellaneous expense deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Miscellaneous expense not found or could not be deleted.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting miscellaneous expense by ID:', message: error.message });
  }
};

module.exports = {
  addMiscExpense,
  getMiscExpenseById,
  getAllMiscExpenses,
  updateMiscExpense,
  deleteMiscExpense,
};
