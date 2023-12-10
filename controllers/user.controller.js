const User = require('../models/user.model');

const getAllUsers = async (req, res) => {
  try {
    const nonAdminUsers = await User.find({ isAdmin: false });
    res.status(200).json({ user: nonAdminUsers });
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne({ _id: userId, isAdmin: false });
    res.status(200).json({ user: user });
  } catch (error) {
    console.error('Error finding non-admin user by ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await User.deleteOne({ _id: userId });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'User deleted successfully.' });
    } else {
      res.status(404).json({ message: 'User not found or could not be deleted.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user by ID:', message: error.message });
  }
};

const updateUserById = async (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

  try {
    const result = await User.updateOne({ _id: userId }, { $set: updatedUserData });

    if (result.nModified === 1) {
      res.status(200).json({ message: 'User updated successfully.' });
    } else {
      res.status(404).json({ message: 'User not found or data not modified.' });
    }
  } catch (error) {
    console.error('Error updating user by ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
};
