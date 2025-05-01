import { useState } from 'react';
import Modal from '../components/Modal';
import { races } from '../data/races';

function Home() {
  const [selectedRace, setSelectedRace] = useState(null);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center py-8">Oregon Sailing Races</h1>
      <div className="bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto space-y-4 px-4">
          {races.map((race, index) => (
            <div 
              key={index} 
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white"
              onClick={() => setSelectedRace(race)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedRace(race);
                }
              }}
            >
              <h2 className="text-xl font-semibold">{race.title}</h2>
              <p className="text-gray-600">{race.date} / {race.location}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedRace && (
        <Modal 
          race={selectedRace} 
          onClose={() => setSelectedRace(null)} 
        />
      )}
    </div>
  );
}

export default Home; 