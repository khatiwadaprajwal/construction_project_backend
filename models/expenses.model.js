const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const expenseSchema = new mongoose.Schema({
    expid: {
        type: String,
        default: uuidv4,
        unique: true
    },
    pid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    transactionDate: {
        type: Date,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['FULLY_PAID', 'PARTIALLY_PAID', 'NOT_PAID'],
        required: true,
    },
    billNo: {
        type: String,
    },
    description: {
        type: String,
    },
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
