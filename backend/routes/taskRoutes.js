import express from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/taskContorller.js"; // Adjust the path as needed
import { authMiddleware } from "../middleware/authMiddleware.js"; // Adjust the path as needed

const router = express.Router();

router.get('/', authMiddleware, getTasks);
router.post('/', authMiddleware, createTask);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

export default router;