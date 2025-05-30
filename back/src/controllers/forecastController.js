import axios from 'axios';

const FLASK_URL = process.env.FLASK_URL || 'http://127.0.0.1:5000';

export const getForecast = async (req, res) => {
  const { location } = req.query;
  if (!location) return res.status(400).json({ error: 'Location is required' });

  try {
    const flaskRes = await axios.get(`${FLASK_URL}/forecast`, { params: { location } });
    res.json(flaskRes.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch forecast', details: err.message });
  }
}; 