const MiscExpense = require('../models/misc.model');
const ProjectData = require('../models/project.model');

const updateMiscExpense = async (req, res) => {
  const miscId = req.params.miscId;
  try {
    console.log('Update Data:', req.body);

    const updatedMiscExpenseData = req.body;

    // Find the existing miscellaneous expense record
    const existingMiscExpense = await MiscExpense.findOne({ misid: miscId });

    if (!existingMiscExpense) {
      return res.status(404).json({ message: 'Miscellaneous expense not found.' });
    }

    // Update the miscellaneous expense record
    const updatedMiscExpense = await MiscExpense.findOneAndUpdate(
      { misid: miscId },
      { $set: updatedMiscExpenseData },
      { new: true }
    ).lean();

    console.log('Result Object:', updatedMiscExpense);

    // Find the project that references the old misc expense ID and update it
    const updatedProject = await ProjectData.findOneAndUpdate(
      { 'miscexpenses': existingMiscExpense._id },
      { $set: { 'miscexpenses.$': updatedMiscExpense._id } },
      { new: true }
    ).lean();

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    res.status(200).json({ message: 'Miscellaneous expense updated successfully.', miscExpense: updatedMiscExpense });
  } catch (error) {
    console.error('Error updating Miscellaneous expense by ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




const deleteMiscExpense = async (req, res) => {
  const miscId = req.params.miscId;

  try {
    // Delete the miscellaneous expense record
    const result = await MiscExpense.deleteOne({ misid: miscId });

    if (result.deletedCount === 1) {
      // Update the ProjectData model by pulling the MiscExpense ID from the array
      const updatedProject = await ProjectData.findOneAndUpdate(
        { 'miscexpenses': miscId },
        { $pull: { 'miscexpenses': miscId } },
        { new: true }
      );

      if (!updatedProject) {
        return res.status(404).json({ message: 'Project not found.' });
      }

      res.status(200).json({ message: 'Miscellaneous expense deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Miscellaneous expense not found or could not be deleted.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting miscellaneous expense by ID:', message: error.message });
  }
};
const addMiscExpense = async (req, res) => {
  const miscExpenseData = req.body;

  try {
    const newMiscExpense = await MiscExpense.create(miscExpenseData);

    // Update the project with the new MiscExpense ID
    const updatedProject = await ProjectData.findOneAndUpdate(
      { _id: miscExpenseData.pid },
      { $push: { miscexpenses: newMiscExpense._id } },
      { new: true }
    );

    if (!updatedProject) {
      // If the project is not found, handle accordingly
      return res.status(404).json({ error: 'Project not found' });
    }

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

module.exports = {
  addMiscExpense,
  getMiscExpenseById,
  getAllMiscExpenses,
  updateMiscExpense,
  deleteMiscExpense,
};
