import React from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RiArrowRightSLine, RiMailLine, RiPhoneLine, RiMapPinLine } from "react-icons/ri";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Helmet } from "react-helmet";

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const hoverScale = {
    scale: 1.05,
    transition: { duration: 0.3 }
  };

  return (
    <>
      <Helmet>
        <title>About - Sahaya Disaster Management</title>
        <meta name="description" content="Sahaya, your reliable partner in disaster management. Discover tools and strategies for effective disaster management solutions." />
        <meta name="keywords" content="disaster management, emergency shelters, hospitals, safety tips, volunteer, Sahaya" />
        <meta name="author" content="Sahaya Team" />
        <meta property="og:title" content="Sahaya Disaster Management" />
        <meta property="og:description" content="Explore tools and strategies to safeguard and empower during crises." />
      </Helmet>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-gradient-to-b from-green-50 to-white min-h-screen"
      >
        <div className="container mx-auto px-4 py-12">
          <motion.section {...fadeIn} className="mb-20">
            <motion.h1 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-bold text-green-800 mb-6 text-center leading-tight"
            >
              Sahaya: Your Guardian in Crisis
            </motion.h1>
            <motion.p 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xl md:text-2xl text-green-700 text-center mb-12 max-w-3xl mx-auto"
            >
              Empowering communities with cutting-edge disaster management solutions for a safer tomorrow.
            </motion.p>
            <motion.div 
              className="flex justify-center space-x-6"
              variants={stagger}
              initial="initial"
              animate="animate"
            >
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#059669" }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 text-white py-4 px-8 rounded-full shadow-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
              >
                Explore Our Mission
              </motion.button>
              <Link to="/signup">
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "#D1FAE5" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-green-700 py-4 px-8 rounded-full shadow-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl flex items-center"
                >
                  Join Sahaya <RiArrowRightSLine className="ml-2 text-xl" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.section>

          <motion.section {...fadeIn} className="mb-20">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-bold text-green-800 mb-6">
                  Real-Time Alerts: Your First Line of Defense
                </h2>
                <p className="text-xl text-green-700 mb-8">
                  Stay ahead of disasters with our state-of-the-art notification system. Be informed, be prepared, be safe.
                </p>
                <motion.div variants={stagger} initial="initial" animate="animate" className="grid grid-cols-2 gap-8">
                  {[
                    { title: "Instant Notifications", desc: "Receive real-time alerts about approaching dangers." },
                    { title: "Community Connection", desc: "Coordinate efforts with local responders and neighbors." },
                    { title: "Custom Safety Plans", desc: "Access personalized evacuation routes and safety tips." },
                    { title: "Resource Locator", desc: "Find nearby shelters, hospitals, and emergency services." }
                  ].map((item, index) => (
                    <motion.div 
                      key={index} 
                      variants={fadeIn} 
                      whileHover={hoverScale}
                      className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      <h3 className="text-xl font-semibold text-green-700 mb-2">{item.title}</h3>
                      <p className="text-green-600">{item.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src="https://i.pinimg.com/474x/c9/b3/d8/c9b3d8c2faf4bb9198b3725ca53db0dd.jpg"
                  alt="Disaster Response"
                  className="rounded-lg shadow-2xl transition-all duration-300"
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-green-600/30 to-transparent rounded-lg"
                  whileHover={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              </motion.div>
            </div>
          </motion.section>

          <motion.section {...fadeIn} className="mb-20">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative order-2 md:order-1"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src="https://www.shutterstock.com/shutterstock/photos/1912175041/display_1500/stock-vector-refugee-camp-for-refugees-victims-of-natural-disasters-many-people-doing-activities-in-the-camp-1912175041.jpg"
                  alt="Community Collaboration"
                  className="rounded-lg shadow-2xl transition-all duration-300"
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-bl from-green-600/30 to-transparent rounded-lg"
                  whileHover={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              </motion.div>
              <div className="order-1 md:order-2">
                <h2 className="text-4xl font-bold text-green-800 mb-6">
                  United We Stand: Community-Driven Resilience
                </h2>
                <p className="text-xl text-green-700 mb-8">
                  Sahaya creates a digital nexus where communities and first responders unite, sharing crucial information and resources to fortify our collective response to emergencies.
                </p>
                <div className="flex space-x-6">
                  <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: "#059669" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-600 text-white py-4 px-8 rounded-full shadow-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
                  >
                    Join the Network
                  </motion.button>
                  <Link to="/signup">
                    <motion.button 
                      whileHover={{ scale: 1.05, backgroundColor: "#D1FAE5" }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-green-700 py-4 px-8 rounded-full shadow-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl flex items-center"
                    >
                      Get Started <RiArrowRightSLine className="ml-2 text-xl" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section {...fadeIn} className="mb-20">
            <h2 className="text-4xl font-bold text-green-800 mb-12 text-center">Frequently Asked Questions</h2>
            <motion.div variants={stagger} initial="initial" animate="animate" className="grid md:grid-cols-2 gap-8">
              {[
                { q: "What is disaster recovery?", a: "Disaster recovery is the strategic process of restoring systems, data, and infrastructure post-disaster, ensuring operational continuity and minimizing downtime." },
                { q: "How to prepare for disasters?", a: "Effective disaster preparedness involves creating a comprehensive emergency plan, assembling a well-stocked disaster supply kit, and staying informed about potential risks in your area." },
                { q: "How can I contribute to Sahaya?", a: "You can contribute by donating to disaster relief efforts, volunteering your time and skills, or helping spread awareness about our platform to enhance community safety during disasters." },
                { q: "Is the Sahaya platform free?", a: "Yes, Sahaya is completely free for both community members and emergency responders. We're committed to providing accessible tools for effective disaster management." },
                { q: "What makes Sahaya unique?", a: "Sahaya stands out with its real-time alert system, community-driven approach, and integration of advanced technologies to provide a comprehensive disaster management solution." },
                { q: "How do I sign up for Sahaya?", a: "Signing up is simple! Visit our website and follow the quick registration process. It only takes a few minutes to join our community of prepared individuals." }
              ].map((faq, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  whileHover={hoverScale}
                  className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-green-500"
                >
                  <h3 className="text-2xl font-semibold text-green-700 mb-4">{faq.q}</h3>
                  <p className="text-green-600 text-lg">{faq.a}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          <motion.section {...fadeIn} className="mb-20">
            <h2 className="text-4xl font-bold text-green-800 mb-12 text-center">Get in Touch</h2>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white p-12 rounded-lg shadow-xl transition-all duration-300"
            >
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-3xl font-semibold text-green-700 mb-6">Contact Us</h3>
                  <p className="text-xl text-green-600 mb-8">Have a question or want to get involved? We're here to help!</p>
                  <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: "#059669" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-600 text-white py-4 px-8 rounded-full shadow-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
                    onClick={() => window.location.href = "mailto:contact@sahaya.com"}
                  >
                    Send us a Message
                  </motion.button>
                </div>
                <div className="space-y-6">
                  <motion.div whileHover={hoverScale} className="flex items-center">
                    <RiPhoneLine className="text-3xl text-green-600 mr-6" />
                    <p className="text-xl text-green-700">+1 (800) SAHAYA-HELP</p>
                  </motion.div>
                  <motion.div whileHover={hoverScale} className="flex items-center">
                    <RiMailLine className="text-3xl text-green-600 mr-6" />
                    <p className="text-xl text-green-700">contact@sahaya.com</p>
                  </motion.div>
                  <motion.div whileHover={hoverScale} className="flex items-center">
                    <RiMapPinLine className="text-3xl text-green-600 mr-6" />
                    <p className="text-xl text-green-700">123 Resilience Road, Safe City, SC 12345</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.section>

          <motion.footer 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-green-800 text-white rounded-lg shadow-xl p-12"
          >
            <div className="grid md:grid-cols-4 gap-12">
              <motion.div whileHover={hoverScale}>
                <img src="/nexus3.png" alt="Sahaya logo" className="h-20 mb-6" />
                <p className="text-lg">Empowering communities through innovative disaster management solutions.</p>
              </motion.div>
              <div>
                <h4 className="text-2xl font-semibold mb-6">Quick Links</h4>
                <ul className="space-y-4">
                  <li><Link to="/" className="text-lg hover:text-green-300 transition duration-300">Home</Link></li>
                  <li><Link to="/about" className="text-lg hover:text-green-300 transition duration-300">About</Link></li>
                  <li><Link to="/services" className="text-lg hover:text-green-300 transition duration-300">Services</Link></li>
                  <li><Link to="/contact" className="text-lg hover:text-green-300 transition duration-300">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-2xl font-semibold mb-6">Legal</h4>
                <ul className="space-y-4">
                  <li><Link to="/privacy" className="text-lg hover:text-green-300 transition duration-300">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="text-lg hover:text-green-300 transition duration-300">Terms of Service</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-2xl font-semibold mb-6">Connect With Us</h4>
                <div className="flex space-x-6">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition duration-300">
                    <FaFacebook className="text-3xl" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition duration-300">
                    <FaTwitter className="text-3xl" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition duration-300">
                    <FaLinkedin className="text-xl" />
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-green-700 text-center">
              <p>&copy; 2024 Sahaya Disaster Management. All rights reserved.</p>
            </div>
          </motion.footer>
        </div>
      </motion.div>
    </>
  );
};

export default About;