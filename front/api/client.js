
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getAllRaces = async () => {
  const response = await fetch(`${API_URL}/races`);
  if (!response.ok) {
    throw new Error('Failed to fetch races');
  }
  return response.json();
};


export const getRace = async (id) => {
  const response = await fetch(`${API_URL}/races/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch race');
  }
  return response.json();
};


export const createRace = async (race) => {
  const response = await fetch(`${API_URL}/races`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(race),
  });
  if (!response.ok) {
    throw new Error('Failed to create race');
  }
  return response.json();
};

export const updateRace = async (id, race) => {
  const response = await fetch(`${API_URL}/races/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(race),
  });
  if (!response.ok) {
    throw new Error('Failed to update race');
  }
  return response.json();
};

export const deleteRace = async (id) => {
  const response = await fetch(`${API_URL}/races/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete race');
  }
}; 