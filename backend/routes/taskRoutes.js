import express from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/taskContorller.js";
import authenticateToken from "../middleware/authMiddleware.js"; // ✅ Import the default export correctly

const router = express.Router();

router.get('/', authenticateToken, getTasks);
router.post('/', authenticateToken, createTask);
router.put('/:id', authenticateToken, updateTask);
router.delete('/:id', authenticateToken, deleteTask);

export default router;
