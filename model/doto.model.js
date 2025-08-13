import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true }

}, { timestamps: true });

const Todo=mongoose.model("Todo",todoSchema);
export default Todo
