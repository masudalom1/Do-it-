import express from "express";
import Todo from "../model/doto.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, description, startTime, endTime } = req.body;
    const todo = new Todo({
      title,
      description,
      startTime,
      endTime,
    });
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get todo
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(updatedTodo); // ✅ Always send valid JSON
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
