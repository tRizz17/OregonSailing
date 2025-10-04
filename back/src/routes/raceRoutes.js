
import express from 'express';
import { 
  getAllRaces, 
  getRace, 
  createRace, 
  updateRace, 
  deleteRace 
} from '../controllers/raceController.js';

const router = express.Router();

router.get('/', getAllRaces);

router.get('/:id', getRace);

router.post('/', createRace);

router.put('/:id', updateRace);

router.delete('/:id', deleteRace);

export default router; 