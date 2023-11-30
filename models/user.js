const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phno: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String, // Adjust the type based on your actual Role definition
    },
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
        },
    ],
    salaries: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Salary',
        },
    ],
    clientFeedback: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ClientFeedback',
        },
    ],
});

const UserData = mongoose.model('UserData', userSchema);

module.exports = UserData;
