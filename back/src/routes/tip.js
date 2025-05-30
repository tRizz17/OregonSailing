import express from 'express';
import { getTip } from '../controllers/tipController.js';
const router = express.Router();

router.get('/tip', getTip);

export default router;
