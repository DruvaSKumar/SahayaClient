import DashSidebar from "../components/DashSidebar";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";

const HeroPage = () => {
  return (
<>
    <Helmet>
        <title>Hero - Sahaya Disaster Management</title>
        <meta name="description" content="Sahaya, your reliable partner in disaster management. Discover tools and strategies for effective disaster management solutions." />
        <meta name="keywords" content="disaster management, emergency shelters, hospitals, safety tips, volunteer, Sahaya, disaster management, emergency shelters, hospitals, safety tips, volunteer, Sahaya,first aid, preparedness in disaster management, disaster management solutions, about disaster management, prevention of disaster management, emergency recovery plan, disaster management and response, disaster management includes, disaster management planning, managing natural disasters, national disaster management authority upsc, national disaster management plan 2019, national institute for disaster management, types disaster management, earthquake, floods, high, heavy, natural disasters, severity, cyclone, tornado, wildfire, evacuate, heavy rainfall" />
        <meta name="author" content="Sahaya Team" />
        <meta property="og:title" content="Sahaya Disaster Management" />
        <meta property="og:description" content="Explore tools and strategies to safeguard and empower during crises." />
      </Helmet>
    <div className="md:flex">
      <div className="md:w-64">
        <div className="md:fixed">
          <DashSidebar />
        </div>
      </div>
      <div className="md:flex-1">
        <Outlet />
      </div>
    </div>
    </>
  );
};

export default HeroPage;
