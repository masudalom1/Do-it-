import express from "express";
import Todo from "../model/doto.model.js";
import { protect } from "../lib/authMiddleware.js";

const router = express.Router();

// Create todo - only logged in user
router.post("/", protect, async (req, res) => {
  try {
    const { title, description, startTime, endTime } = req.body;
    const todo = new Todo({
      title,
      description,
      startTime,
      endTime,
      user: req.user._id, // store user ID
    });
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all todos for current user
router.get("/", protect, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete todo - only if it belongs to the current user
router.delete("/:id", protect, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!todo) return res.status(404).json({ message: "Todo not found or not yours" });
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update todo - only if it belongs to the current user
router.put("/:id", protect, async (req, res) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found or not yours" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
