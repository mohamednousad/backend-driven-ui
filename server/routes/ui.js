import { Router } from 'express';
import { getUI } from '../controllers/ui.js';

const router = Router();

router.get('/getAll', getUI);

export default router;
