// import mongoose from "mongoose";

// const TaskSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   title: { type: String, required: true },
//   description: { type: String },
//   completed: { type: Boolean, default: false },
//   priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
//   reminderDate: { type: Date },
// }, { timestamps: true });

// const Task = mongoose.model('Task', TaskSchema);

// export default Task;

import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  dueDate: { type: Date },  // ✅ Add this field
  reminderDate: { type: Date },
}, { timestamps: true });

const Task = mongoose.model('Task', TaskSchema);

export default Task;
