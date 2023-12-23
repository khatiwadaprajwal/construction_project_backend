const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const salarySchema = new mongoose.Schema({
    salaryId: {
        type: String,
        default: uuidv4,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserData',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentDate: {
        type: Date,
        required: true,
    },
    receiptFilePath: {
        type: String,
    },
});

const Salary = mongoose.model('Salary', salarySchema);

module.exports = Salary;
