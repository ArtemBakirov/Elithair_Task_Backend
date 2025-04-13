import express from "express";

import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './routes/Slot.routes.js';
import { initializeSlots } from './controllers/Slot.Controller.js';

dotenv.config();



const app = express();
app.use(cors());
app.use(express.json());


const MONGO_URI = process.env.MONGO_URI as string;

mongoose.connect(MONGO_URI)
    .then(() => {
      console.log('Connected to MongoDB');
      initializeSlots();
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error);
    });

app.use('/api', router);
app.use(cors());

const port = process.env.PORT ?? "3001";
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
