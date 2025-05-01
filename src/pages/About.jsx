import { useState } from 'react';
import ExternalLinkWarning from '../components/ExternalLinkWarning';

const resources = [
  {
    title: "How to Sail (US Sailing)",
    url: "https://www.ussailing.org/education/adult/first-sail/",
  },
  {
    title: 'YouTube – "Sailing Basics" by Nautilus Sailing',
    url: "https://www.youtube.com/c/NautilusSailing",
  },
  {
    title: "Local sailing schools",
    url: "https://asa.com/find-sailing-school/",
  },
  {
    title: "Sailboat terminology (ASA)",
    url: "https://americansailing.com/articles/sailing-terms-you-can-use/",
  },
];

function About() {
  const [warningUrl, setWarningUrl] = useState(null);

  const handleLinkClick = (e, url) => {
    e.preventDefault();
    setWarningUrl(url);
  };

  const handleConfirmNavigation = () => {
    if (warningUrl) {
      window.open(warningUrl, '_blank');
      setWarningUrl(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 pb-12">
      <h1 className="text-4xl font-bold text-center my-8">All About Sailing and Racing</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <p className="text-gray-700">
            Sailing is the art and sport of harnessing the wind to move a boat across water. Whether you're cruising a lake, coastal bay, or open sea, sailing offers a unique blend of adventure, skill, and freedom. It's accessible to beginners and endlessly rewarding for those who stick with it.
          </p>
          
          <p className="text-gray-700">
            Interested in racing? Getting started is easier than you might think. Many local sailing clubs and yacht clubs offer beginner-friendly races, training sessions, and opportunities to crew on other people's boats. You don't need to own a boat — just show up, ask questions, and be ready to learn.
          </p>
          
          <p className="text-gray-700">
            This site helps new and returning sailors discover upcoming races in Oregon and beyond. Whether you're here to race, volunteer, or just learn, you're in the right place.
          </p>

          <div className="mt-8">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
              <span className="text-blue-500">⚓</span> Learn More
            </h2>
            <p className="text-gray-700 mb-4">
              Want to start sailing or sharpen your skills? Check out these beginner-friendly resources:
            </p>
            <ul className="space-y-2">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a 
                    href={resource.url}
                    onClick={(e) => handleLinkClick(e, resource.url)}
                    className="text-blue-500 hover:underline"
                  >
                    {resource.title}
                  </a>
                  {resource.title === "Local sailing schools" && (
                    <span className="text-gray-700"> or clubs near you</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="flex-1">
          <img 
            src="/sailing-image.jpeg" 
            alt="Sailboats on Elk Lake with South Sister mountain in the background under cloudy blue skies" 
            className="rounded-lg w-full h-auto shadow-lg"
          />
        </div>
      </div>

      {warningUrl && (
        <ExternalLinkWarning 
          website={warningUrl}
          onConfirm={handleConfirmNavigation}
          onCancel={() => setWarningUrl(null)}
        />
      )}
    </div>
  );
}

export default About; 