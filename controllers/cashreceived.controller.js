const CashReceived = require('../models/cashreceived.model')
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
  const receivedRecordData = req.body;

  try {
    console.log(receivedRecordData);
    const newReceivedRecord = await CashReceived.create(receivedRecordData);
    res.status(201).json({ message: 'Cash received record created successfully.', receivedRecord: newReceivedRecord });
  } catch (error) {
    console.error('Error creating cash received record:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateReceivedRecord = async (req, res) => {
  const cashid = req.params.cashid;
  const updatedReceivedRecordData = req.body;

  try {
    const result = await CashReceived.findOneAndUpdate({ cashId: cashId }, { $set: updatedReceivedRecordData }, { new: true });

    if (result) {
      res.status(200).json({ message: 'Cash received record updated successfully.', receivedRecord: result });
    } else {
      res.status(404).json({ message: 'Cash received record not found.' });
    }
  } catch (error) {
    console.error('Error updating cash received record by ID:', error.message);
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
