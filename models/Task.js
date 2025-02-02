const mongoose = require('mongoose'); 

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this task'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for this task'],
  },
  status: {
    type: String,
    enum: ['Completed', 'In Progress', 'To complete'],
    default: 'To complete',
  },
  dateToBeFinished: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Task', TaskSchema);
