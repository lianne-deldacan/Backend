const Task = require('../models/Task');
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { name, description, status, dateToBeFinished } = req.body;

    const task = await Task.create({
      name,
      description,
      status,
      dateToBeFinished,
    });

    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status, dateToBeFinished } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { name, description, status, dateToBeFinished },
      { new: true }
    );

    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
