import express from 'express';
import cors from 'cors';
import uiRoutes from './routes/user.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/ui', uiRoutes);

export default app;
