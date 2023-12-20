const User = require('../models/user.model');


const getAllUsers = async (req, res) => {
  try {
    const nonAdminUsers = await User.find({ isadmin: false });
    res.status(200).json({ user: nonAdminUsers });
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    console.log(id);

    // Construct a filter object with the user ID
    const userone = await User.findOne({ userId: id });


    if (!userone) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user: userone });
  } catch (error) {
    console.error('Error finding non-admin user by ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




const deleteUserById = async (req, res) => {
  const userId = req.params.userId.toString();
  try {
    const result = await User.deleteOne({ userId: userId });

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
  const userId = req.params.Id;
  const updatedUserData = req.body;
  

  try {
    const result = await User.findOneAndUpdate({ userId: userId }, { $set: updatedUserData }, { new: true });
    console.log(result);

    if (result) {
      res.status(200).json({ message: 'User updated successfully.', user: result });
    } else {
      res.status(404).json({ message: 'User not found.' });
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
