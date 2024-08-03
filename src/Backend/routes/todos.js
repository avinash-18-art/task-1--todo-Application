const express = require('express');
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/todos', auth, async (req, res) => {
  const { title, description } = req.body;
  try {
    const todo = new Todo({
      userId: req.user._id,
      title,
      description
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/todos', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user._id });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/todos/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { title, description, completed },
      { new: true }
    );
    if (!todo) return res.status(404).json({ error: 'To-do not found' });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/todos/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!todo) return res.status(404).json({ error: 'To-do not found' });
    res.json({ message: 'To-do deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;