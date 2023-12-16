const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const projectSchema = new mongoose.Schema({
  projectId: { type: String, default: uuidv4, unique: true },
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
  },
  budget: {
    type: Number,
    required: [true, 'Budget is required'],
  },
  status: {
    type: String,
    enum: ['STARTED', 'PENDING', 'ONGOING', 'COMPLETED'],
    required: [true, 'Status is required'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserData',
    required: [true, 'User ID is required'],
  },
  invoices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Invoice',
    },
  ],
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expense',
    },
  ],
  cashReceived: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CashReceived',
    },
  ],
  suppliers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier',
    },
  ],
  clientFeedback: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ClientFeedback',
    },
  ],
});




const ProjectData = mongoose.model('ProjectData', projectSchema);

module.exports = ProjectData;
