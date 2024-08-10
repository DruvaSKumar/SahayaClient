import DashSidebar from "../components/DashSidebar";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";

const HeroPage = () => {
  return (
<>
    <Helmet>
        <title>Hero - Sahaya Disaster Management</title>
        <meta name="description" content="Sahaya, your reliable partner in disaster management. Discover tools and strategies for effective disaster management solutions." />
        <meta name="keywords" content="disaster management, emergency shelters, hospitals, safety tips, volunteer, Sahaya" />
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
