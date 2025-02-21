import 'dotenv/config'; // Use this for loading environment variables
import express from "express";
import cors from "cors";
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes.js'; // Adjust the path as needed
import taskRoutes from './routes/taskRoutes.js'; // Adjust the path as needed

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch(err => console.error(err));