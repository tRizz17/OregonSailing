import { useState } from 'react';
import Modal from '../components/Modal';
import { races } from '../data/races';

function Home() {
  const [selectedRace, setSelectedRace] = useState(null);

  const isUpcoming = (dateStr) => {
    const raceDate = new Date(dateStr);
    const today = new Date();
    const diffTime = raceDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  };

  const getRegistrationStatus = (dateStr) => {
    const raceDate = new Date(dateStr);
    const today = new Date();
    const diffTime = raceDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: 'Past', color: 'text-gray-500' };
    if (diffDays <= 2) return { text: 'Very Soon!', color: 'text-red-600' };
    if (diffDays <= 7) return { text: 'Coming Soon', color: 'text-orange-500' };
    if (diffDays <= 14) return { text: 'Upcoming', color: 'text-blue-500' };
    return { text: '', color: '' };
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center py-8">Oregon Sailing Races</h1>
      <div className="bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto space-y-4 px-4">
          {races.map((race, index) => {
            const status = getRegistrationStatus(race.date);
            return (
              <div 
                key={index} 
                className={`border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white
                  ${isUpcoming(race.date) ? 'border-l-4 border-l-orange-500' : ''}`}
                onClick={() => setSelectedRace(race)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedRace(race);
                  }
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">{race.title}</h2>
                    <p className="text-gray-600">{race.date} / {race.location}</p>
                  </div>
                  {status.text && (
                    <span className={`${status.color} text-sm font-medium px-2 py-1 bg-opacity-10 rounded`}>
                      {status.text}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
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