const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const miscExpenseSchema = new mongoose.Schema({
    misid: {
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
    description: {
        type: String,
    },
});

const MiscExpense = mongoose.model('MiscExpense', miscExpenseSchema);

module.exports = MiscExpense;