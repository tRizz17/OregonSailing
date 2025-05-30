import { useState, useEffect } from 'react';
import ExternalLinkWarning from './ExternalLinkWarning';


function Modal({ race, onClose }) {
  const [forecast, setForecast] = useState(null);
  const [loadingForecast, setLoadingForecast] = useState(false);
  const [forecastError, setForecastError] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);


  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };


  const handleWebsiteClick = (e) => {
    e.preventDefault();
    setShowWarning(true);
  };

  const handleConfirmNavigation = () => {
    window.open(race.clubWebsite, '_blank');
    setShowWarning(false);
  };

  const fetchForecast = async () => {
    setLoadingForecast(true);
    setForecastError(null);
    setForecast(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/forecast?location=${encodeURIComponent(race.location)}`);
      if (!res.ok) throw new Error('Failed to fetch forecast');
      const data = await res.json();
      setForecast(data);
    } catch (err) {
      setForecastError('Could not fetch forecast.');
    } finally {
      setLoadingForecast(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl sm:text-2xl font-bold pr-8">{race.title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2 -m-2"
              aria-label="Close modal"
            >
              <span className="text-xl">✕</span>
            </button>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <p className="text-base sm:text-lg font-semibold">{race.date}</p>
              <p className="text-sm sm:text-base text-gray-600">{race.startTime} - {race.endTime}</p>
              <p className="text-sm sm:text-base text-gray-600">{race.location}</p>
              <button
                onClick={fetchForecast}
                className="mt-2 mb-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm sm:text-base"
                disabled={loadingForecast}
              >
                {loadingForecast ? 'Loading Forecast...' : 'View 3-Day Forecast'}
              </button>
              {forecastError && <p className="text-red-600 text-sm mt-1">{forecastError}</p>}
              {forecast && Array.isArray(forecast) && (
                <div className="mt-2">
                  <h4 className="font-semibold mb-1">3-Day Forecast</h4>
                  <ul className="text-sm space-y-1">
                    {forecast.map(day => (
                      <li key={day.date}>
                        <strong>{day.date}:</strong> High {day.temperature_high}°F, Low {day.temperature_low}°F, Wind {day.wind_speed_avg} mph, Rain {day.precipitation}%
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <hr className="my-2" />
              {race.clubWebsite && (
                <a 
                  href={race.clubWebsite}
                  onClick={handleWebsiteClick}
                  className="text-blue-500 hover:underline mt-2 inline-block text-sm sm:text-base"
                >
                  Visit Club Website
                </a>
              )}
            </div>

            <div>
              <h3 className="font-semibold mb-1 sm:mb-2 text-base sm:text-lg">About this Race</h3>
              <p className="text-sm sm:text-base text-gray-700">{race.description}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-1 sm:mb-2 text-base sm:text-lg">Difficulty Level</h3>
              <p className="text-sm sm:text-base text-gray-700">{race.difficulty}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-1 sm:mb-2 text-base sm:text-lg">Requirements</h3>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1">
                {race.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold mb-1 sm:mb-2 text-base sm:text-lg">Registration</h3>
              <p className="text-sm sm:text-base text-gray-700">Deadline: {race.registrationDeadline}</p>
              <p className="text-sm sm:text-base text-gray-700">Contact: {race.contact}</p>
            </div>
          </div>
        </div>
      </div>

      {showWarning && (
        <ExternalLinkWarning 
          website={race.clubWebsite}
          onConfirm={handleConfirmNavigation}
          onCancel={() => setShowWarning(false)}
        />
      )}
    </div>
  );
}

export default Modal; 