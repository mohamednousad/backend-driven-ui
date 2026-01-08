import express from 'express';
import cors from 'cors';
import uiRoutes from './4h393v/cxO359.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/ui', uiRoutes);

export default app;
