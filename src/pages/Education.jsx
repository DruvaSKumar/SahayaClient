import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaInfoCircle, FaYoutube } from 'react-icons/fa';

const disasterTypes = [
  {
    name: 'EARTHQUAKE',
    // icon: '🏚️',
    color: '#FF6B6B',
    info: 'Earthquakes are sudden ground shakes caused by tectonic plate movements. Stay away from windows and take cover under sturdy furniture during an earthquake.Drop, Cover, and Hold On. Move away from windows and objects that can fall. After shaking stops, evacuate the building using stairs. Move to an open area away from buildings and power lines.',
    image: 'https://plus.unsplash.com/premium_photo-1695914233513-6f9ca230abdb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZWFydGhxdWFrZXxlbnwwfHwwfHx8MA%3D%3D',
    youtubeLink: 'https://www.youtube.com/watch?v=BLEPakj1YTY'
  },
  {
    name: 'FLOOD',
    // icon: '🌊',
    color: '#4ECDC4',
    info: 'Floods occur when water overflows onto normally dry land. Move to higher ground and avoid walking or driving through floodwaters. Move to higher ground immediately.  Avoid walking or driving through flood waters.,Listen to emergency services and follow evacuation orders.,Stay away from electrical lines and power sources.',
    image: 'https://plus.unsplash.com/premium_photo-1661962476059-13543ea45d4d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zmxvb2R8ZW58MHx8MHx8fDA%3D',
    youtubeLink: 'https://www.youtube.com/watch?v=43M5mZuzHF8'
  },
  {
    name: 'CYCLONE',
    // icon: '🌀',
    color: '#45B7D1',
    info:'Cyclones are powerful storms with strong winds and heavy rainfall. Secure loose objects, stay indoors, and follow evacuation orders if given. Follow evacuation orders from local authorities. Turn off utilities if instructed to do so. Take shelter in a sturdy building away from windows. Have an emergency kit and important documents ready.',
    image: 'https://media.istockphoto.com/id/1146555316/photo/cyclone-fani-heading-towards-india-in-2019-elements-of-this-image-furnished-by-nasa.webp?b=1&s=170667a&w=0&k=20&c=3crsWIkZ00_KvoaI9Tmk19t6Dmp7_PseVnefR-haC5E=',
    youtubeLink: 'https://youtu.be/xHRbnuB9F1I?si=H7EbLnLxb7Dv3uR9'
  },
  {
    name: 'LANDSLIDE',
    // icon: '🏔️',
    color: '#C44D58',
    info: 'Landslides involve downslope movement of rock, soil, or debris. Be alert for unusual sounds and changes in landscape, and evacuate if advised.Move to Higher Ground: If you notice signs of a landslide (like rumbling sounds or ground shifting), quickly move to higher, stable ground away from the path of the slide.Stay Alert: Listen for unusual sounds, such as cracking trees or boulders knocking together, and if you’re in a building, evacuate immediately.Protect Yourself: If escape is not possible, curl into a tight ball and protect your head to minimize injury, and seek shelter behind a sturdy object if available.',
    image: 'https://media.istockphoto.com/id/1415609983/photo/heavy-landslides-happened-in-the-nedumpoyil-ghat-in-kerala.webp?b=1&s=170667a&w=0&k=20&c=RoVIIPbef_AQdgiEB01K3YAApsOAo0vFYXEGtBbp2Vc=',
    youtubeLink: 'https://youtu.be/0Jua-tId3Ds?si=dZwxxdlaVOD6Feso'
  },
  {
    name: 'WILDFIRE',
    // icon: '🔥',
    color: '#FF9800',
    info: 'Wildfires are uncontrolled fires in areas of combustible vegetation. Create defensible space around your home and have an evacuation plan ready.Evacuate immediately if told to do so. Close all windows and doors to prevent drafts. Wear protective clothing to prevent burns. Have an emergency kit ready to go.',
    image: 'https://media.istockphoto.com/id/1200452781/photo/burning-fire-in-the-forest.webp?b=1&s=170667a&w=0&k=20&c=Sham-dScgY_74oF5TH3QVT4qFT3R4H_yEb_tWC6wezg=',
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