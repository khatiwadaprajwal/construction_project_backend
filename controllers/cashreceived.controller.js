const CashReceived = require('../models/cashreceived.model')
const ProjectData = require('../models/project.model')
const getAllReceivedRecords = async (req, res) => {
  try {
    const receivedRecords = await CashReceived.find();
    res.status(200).json({ receivedRecords });
  } catch (error) {
    console.error('Error fetching received records:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getReceivedRecordById = async (req, res) => {
  const cashid = req.params.cashid;

  try {
    const receivedRecord = await CashReceived.findOne({ cashId: cashid });

    if (!receivedRecord) {
      return res.status(404).json({ error: 'Cash received record not found' });
    }

    res.status(200).json({ receivedRecord });
  } catch (error) {
    console.error('Error finding cash received record by ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const createNewReceivedRecord = async (req, res) => {
  const cashReceivedData = req.body;

  try {
    const newCashReceived = await CashReceived.create(cashReceivedData);

    // Update the project with the new CashReceived ID
    const updatedProject = await ProjectData.findOneAndUpdate(
      { _id: cashReceivedData.pid },
      { $push: { cashReceived: newCashReceived._id } },
      { new: true }
    );

    if (!updatedProject) {
      // If the project is not found, handle accordingly
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(201).json({ message: 'CashReceived added successfully.', cashReceived: newCashReceived });
  } catch (error) {
    console.error('Error adding CashReceived:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateReceivedRecord = async (req, res) => {
  const cashid = req.params.cashid;
  try {
    const updatedCashReceivedData = req.body;

    // Find the existing cash received record
    const existingCashReceived = await CashReceived.findOne({ cashId: cashid });

    if (!existingCashReceived) {
      return res.status(404).json({ message: 'CashReceived record not found.' });
    }

    // Update the cash received record
    const updatedCashReceived = await CashReceived.findOneAndUpdate(
      { cashId: cashid },
      { $set: updatedCashReceivedData },
      { new: true }
    );

    // Update the ProjectData model with the new CashReceived ID
    const updatedProject = await ProjectData.findOneAndUpdate(
      { 'cashReceived': cashid },
      { $set: { 'cashReceived.$': updatedCashReceived._id } },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    res.status(200).json({ message: 'CashReceived updated successfully.', cashReceived: updatedCashReceived });
  } catch (error) {
    console.error('Error updating CashReceived by ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const deleteReceivedRecord = async (req, res) => {
  const cashid = req.params.cashid;

  try {
    const result = await CashReceived.deleteOne({ cashId: cashid });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Cash received record deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Cash received record not found or could not be deleted.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting cash received record by ID:', message: error.message });
  }
};

module.exports = {
  getAllReceivedRecords,
  getReceivedRecordById,
  createNewReceivedRecord,
  updateReceivedRecord,
  deleteReceivedRecord,
};