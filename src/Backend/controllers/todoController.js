const ToDo = require('../models/ToDo');

// Create a new to-do item
exports.createToDo = async (req, res) => {
  const { task } = req.body;
  const userId = req.user._id;
  try {
    const newToDo = new ToDo({
      userId,
      task
    });
    await newToDo.save();
    res.status(201).json(newToDo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Retrieve all to-do items for the logged-in user
exports.getToDos = async (req, res) => {
  const userId = req.user._id;
  try {
    const toDos = await ToDo.find({ userId });
    res.json(toDos);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a to-do item by ID
exports.updateToDo = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const { task, completed } = req.body;
  try {
    const toDo = await ToDo.findOneAndUpdate(
      { _id: id, userId },
      { task, completed },
      { new: true }
    );
    if (!toDo) return res.status(404).json({ error: 'To-Do item not found' });
    res.json(toDo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a to-do item by ID
exports.deleteToDo = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    const toDo = await ToDo.findOneAndDelete({ _id: id, userId });
    if (!toDo) return res.status(404).json({ error: 'To-Do item not found' });
    res.json({ message: 'To-Do item deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
