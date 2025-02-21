import express from "express";
import { getTasks, createTask, updateTask, deleteTask, toggleTaskCompletion} from "../controllers/taskContorller.js";
import authenticateToken from "../middleware/authMiddleware.js"; // ✅ Import the default export correctly

const router = express.Router();

router.get('/', authenticateToken, getTasks);
router.post('/', authenticateToken, createTask);
router.put('/:id', authenticateToken, updateTask);
router.delete('/:id', authenticateToken, deleteTask);
router.put('/:id/toggle', authenticateToken, toggleTaskCompletion);

export default router;
