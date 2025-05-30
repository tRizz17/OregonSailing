import express from 'express';
import { getTerm } from '../controllers/termsController.js';
const router = express.Router();

router.get('/terms', getTerm);

export default router;
