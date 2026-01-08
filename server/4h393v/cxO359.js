import { Router } from 'express';
import { getAnalytics, getDashboard, getSettings, getUsers } from '../vSeAtV/Fpoog5.js';

const router = Router();

router.get('/dashboard', getDashboard);
router.get('/analytics', getAnalytics);
router.get('/users', getUsers);
router.get('/settings', getSettings);

export default router;
