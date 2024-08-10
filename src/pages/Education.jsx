import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaInfoCircle, FaYoutube } from 'react-icons/fa';

const disasterTypes = [
  {
    name: 'Earthquake',
    icon: '🏚️',
    color: '#FF6B6B',
    info: 'Earthquakes are sudden ground shakes caused by tectonic plate movements. Stay away from windows and take cover under sturdy furniture during an earthquake.',
    image: 'https://plus.unsplash.com/premium_photo-1695914233513-6f9ca230abdb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZWFydGhxdWFrZXxlbnwwfHwwfHx8MA%3D%3D',
    youtubeLink: 'https://www.youtube.com/watch?v=BLEPakj1YTY'
  },
  {
    name: 'Flood',
    icon: '🌊',
    color: '#4ECDC4',
    info: 'Floods occur when water overflows onto normally dry land. Move to higher ground and avoid walking or driving through floodwaters.',
    image: 'https://plus.unsplash.com/premium_photo-1661962476059-13543ea45d4d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zmxvb2R8ZW58MHx8MHx8fDA%3D',
    youtubeLink: 'https://www.youtube.com/watch?v=43M5mZuzHF8'
  },
  {
    name: 'Cyclone',
    icon: '🌀',
    color: '#45B7D1',
    info: 'Cyclones are powerful storms with strong winds and heavy rainfall. Secure loose objects, stay indoors, and follow evacuation orders if given.',
    image: 'https://source.unsplash.com/random/?cyclone',
    youtubeLink: 'https://www.youtube.com/watch?v=zXwSM7yYz3E'
  },
  {
    name: 'Landslide',
    icon: '🏔️',
    color: '#C44D58',
    info: 'Landslides involve downslope movement of rock, soil, or debris. Be alert for unusual sounds and changes in landscape, and evacuate if advised.',
    image: 'https://source.unsplash.com/random/?landslide',
    youtubeLink: 'https://www.youtube.com/watch?v=RNSWRZPw-oQ'
  },
  {
    name: 'Wildfire',
    icon: '🔥',
    color: '#FF9800',
    info: 'Wildfires are uncontrolled fires in areas of combustible vegetation. Create defensible space around your home and have an evacuation plan ready.',
    image: 'https://source.unsplash.com/random/?wildfire',
    youtubeLink: 'https://www.youtube.com/watch?v=5hghT1W33cY'
  }
];

const Education = () => {
  const [selectedDisaster, setSelectedDisaster] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">DISASTER EDUCATION CENTER</h1>
      
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {disasterTypes.map((disaster, index) => (
          <motion.div
            key={disaster.name}
            className="w-48 h-40 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer"
            style={{ backgroundColor: disaster.color }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedDisaster(disaster)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="text-4xl mb-2">{disaster.icon}</span>
            <h2 className="text-xl font-semibold text-white">{disaster.name}</h2>
          </motion.div>
        ))}
      </div>

      {selectedDisaster && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="rounded-lg shadow-xl p-6 max-w-3xl mx-auto overflow-hidden relative"
          style={{
            backgroundImage: `url(${selectedDisaster.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md"></div>
          <div className="relative z-10 text-white">
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-4">{selectedDisaster.icon}</span>
              <h2 className="text-3xl font-bold">{selectedDisaster.name}</h2>
            </div>
            <p className="text-lg mb-4">{selectedDisaster.info}</p>
            <div className="flex items-center space-x-4">
              <a 
                href={selectedDisaster.youtubeLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
              >
                <FaYoutube className="mr-2" />
                Watch Video
              </a>
              <a 
                href="#" 
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                <FaInfoCircle className="mr-2" />
                Learn More
              </a>
            </div>
          </div>
        </motion.div>
      )}

      <div className="mt-12 text-center">
        <h3 className="text-2xl font-semibold mb-4">Stay Prepared, Stay Safe</h3>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Understanding these disasters and how to respond can save lives. Always stay informed about potential 
          risks in your area and follow guidelines from local authorities during emergencies.
        </p>
      </div>
    </div>
  );
};

export default Education;