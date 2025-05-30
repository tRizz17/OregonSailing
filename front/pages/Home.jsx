
import { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import { getAllRaces, deleteRace } from '../api/client';
import SailingTipButton from '../components/SailingTipButton';
import SailingTermButton from '../components/SailingTermButton';


function Home() {
  const [selectedRace, setSelectedRace] = useState(null);
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoading, setShowLoading] = useState(false);


  const shouldDeleteRace = (dateStr) => {
    const raceDate = new Date(dateStr);
    const today = new Date();
    const diffTime = today - raceDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 1; // Delete if more than 1 day has passed
  };

  const fetchAndCleanRaces = async () => {
    try {
      const data = await getAllRaces();
      
      // Check for races that need to be deleted
      const racesToDelete = data.filter(race => shouldDeleteRace(race.date));
      
      // Delete past races and update the data array
      let updatedRaces = [...data];
      for (const race of racesToDelete) {
        try {
          await deleteRace(race._id);
          console.log(`Deleted past race: ${race.title}`);
          // Remove the deleted race from our local array
          updatedRaces = updatedRaces.filter(r => r._id !== race._id);
        } catch (err) {
          console.error(`Failed to delete race ${race._id}:`, err);
        }
      }
      
      // Sort races by date
      const sortedRaces = updatedRaces.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });
      
      setRaces(sortedRaces);
      setLoading(false);
    } catch (err) {
      setError('Failed to load races. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    let timeout = setTimeout(() => setShowLoading(true), 300); // 300ms delay
    fetchAndCleanRaces();
    return () => clearTimeout(timeout);
  }, []);


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

  if (loading && showLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Loading races...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end items-center mt-4 mb-2">
        <SailingTipButton />
      </div>
      <div className="flex justify-end items-center mt-4 mb-2">
        <SailingTermButton />
      </div>
      <h1 className="font-playfair text-2xl md:text-3xl font-bold text-center py-6 md:py-8 px-4">
        Oregon Sailing Races
      </h1>

      <div className="bg-gray-50 py-6 md:py-8">
        <div className="max-w-3xl mx-auto space-y-3 md:space-y-4 px-4">

          {races.map((race) => {
            const status = getRegistrationStatus(race.date);
            return (
              <div 
                key={race._id} 
                className={`border rounded-lg p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white
                  ${isUpcoming(race.date) ? 'border-l-4 border-l-orange-500' : ''}`}
                onClick={() => setSelectedRace(race)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedRace(race);
                  }
                }}
              >

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
                  <div>
                    <h2 className="text-lg md:text-xl font-semibold">{race.title}</h2>
                    <p className="text-sm md:text-base text-gray-600">{race.date} / {race.location}</p>
                  </div>

                  {status.text && (
                    <span className={`${status.color} text-sm font-medium px-2 py-1 bg-opacity-10 rounded self-start sm:self-auto`}>
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