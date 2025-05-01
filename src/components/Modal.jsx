import { useState } from 'react';
import ExternalLinkWarning from './ExternalLinkWarning';

function Modal({ race, onClose }) {
  const [showWarning, setShowWarning] = useState(false);

  // Close modal when clicking outside
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

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{race.title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-lg font-semibold">{race.date}</p>
              <p className="text-gray-600">{race.startTime} - {race.endTime}</p>
              <p className="text-gray-600">{race.location}</p>
              {race.clubWebsite && (
                <a 
                  href={race.clubWebsite}
                  onClick={handleWebsiteClick}
                  className="text-blue-500 hover:underline mt-2 inline-block"
                >
                  Visit Club Website
                </a>
              )}
            </div>

            <div>
              <h3 className="font-semibold mb-2">About this Race</h3>
              <p className="text-gray-700">{race.description}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Difficulty Level</h3>
              <p className="text-gray-700">{race.difficulty}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Requirements</h3>
              <ul className="list-disc list-inside text-gray-700">
                {race.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Registration</h3>
              <p className="text-gray-700">Deadline: {race.registrationDeadline}</p>
              <p className="text-gray-700">Contact: {race.contact}</p>
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