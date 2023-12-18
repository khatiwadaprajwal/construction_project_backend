const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const cashReceivedSchema = new mongoose.Schema({
  cashId: {
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
  receivedDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['RECEIVED', 'PENDING', 'DECLINED'],
    required: true,
  },
});

const CashReceived = mongoose.model('CashReceived', cashReceivedSchema);

module.exports = CashReceived;
