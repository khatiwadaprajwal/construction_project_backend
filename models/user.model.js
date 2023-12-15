const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Import uuidv4


const userSchema = new mongoose.Schema({
    userId: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    full_name: {
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
        required:true
    },
    password: {
        type: String,
        required: true,
    },
    isadmin: {
        type: Boolean,
        default: false, 
        // Adjust the type based on your actual Role definition
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
userSchema.set('primary_key', 'userId');
const UserData = mongoose.model('UserData', userSchema);

module.exports = UserData;
