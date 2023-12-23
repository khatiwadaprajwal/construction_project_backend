const Salary = require('../models/salary.model');
const UserData = require('../models/user.model'); // Replace 'user.model' with your actual User model name

const getAllSalaries = async (req, res) => {
  try {
    const salaries = await Salary.find();
    res.status(200).json({ salaries });
  } catch (error) {
    console.error('Error fetching salaries:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getSalaryById = async (req, res) => {
  const sId = req.params.sId;

  try {
    const salary = await Salary.findOne({ salaryId: sId });

    if (!salary) {
      return res.status(404).json({ error: 'Salary not found' });
    }

    res.status(200).json({ salary });
  } catch (error) {
    console.error('Error finding salary by ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addSalary = async (req, res) => {
  const salaryData = req.body;

  try {
    // Assuming salaryData.userId is the user's _id
    const newSalary = await Salary.create(salaryData);

    // Update the user with the new Salary ID
    const updatedUser = await UserData.findOneAndUpdate(
      { _id: salaryData.userId },
      { $push: { salaries: newSalary._id } },
      { new: true }
    );

    if (!updatedUser) {
      // If the user is not found, handle accordingly
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(201).json({ message: 'Salary created successfully.', salary: newSalary });
  } catch (error) {
    console.error('Error creating salary:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateSalaryById = async (req, res) => {
  const uId = req.params.uId;
  const updatedSalaryData = req.body;

  try {
    const result = await Salary.findOneAndUpdate({ salaryId: uId }, { $set: updatedSalaryData }, { new: true });

    if (result) {
      res.status(200).json({ message: 'Salary updated successfully.', salary: result });
    } else {
      res.status(404).json({ message: 'Salary not found.' });
    }
  } catch (error) {
    console.error('Error updating salary by ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteSalaryById = async (req, res) => {
  const dId = req.params.dId;

  try {
    const result = await Salary.findOneAndDelete({ salaryId: dId });

    if (result) {
      // Update the UserData model by pulling the Salary ID from the array
      const updatedUser = await UserData.findOneAndUpdate(
        { salaries: result._id },
        { $pull: { salaries: result._id } },
        { new: true }
      );

      if (updatedUser) {
        res.status(200).json({ message: 'Salary deleted successfully.' });
      } else {
        res.status(404).json({ message: 'User not found or salary already deleted.' });
      }
    } else {
      res.status(404).json({ message: 'Salary not found or could not be deleted.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting salary by ID:', message: error.message });
  }
};

module.exports = {
  getAllSalaries,
  getSalaryById,
  addSalary,
  updateSalaryById,
  deleteSalaryById,
};
