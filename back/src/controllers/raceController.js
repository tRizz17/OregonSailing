
import Race from '../models/Race.js';

export const getAllRaces = async (req, res) => {
  try {
    const races = await Race.find().sort({ date: 1 });
    res.json(races);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRace = async (req, res) => {
  try {
    const race = await Race.findById(req.params.id);
    if (!race) {
      return res.status(404).json({ message: 'Race not found' });
    }
    res.json(race);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRace = async (req, res) => {
  const race = new Race(req.body);
  try {
    const newRace = await race.save();
    res.status(201).json(newRace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const updateRace = async (req, res) => {
  try {
    const race = await Race.findById(req.params.id);
    if (!race) {
      return res.status(404).json({ message: 'Race not found' });
    }
    
    Object.assign(race, req.body);
    const updatedRace = await race.save();
    res.json(updatedRace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteRace = async (req, res) => {
  try {
    const race = await Race.findById(req.params.id);
    if (!race) {
      return res.status(404).json({ message: 'Race not found' });
    }
    
    await race.deleteOne();
    res.json({ message: 'Race deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 