import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminDashboard from "./AdminDashboard";
import { useLocation } from "react-router-dom";
import GetPlan from "./GetPlan";
import VolunteerDashBoard from "./VolunteerDashBoard";
import EmergencyResponderDashboard from "./EmergencyDashBoard";
import UserDashboard from "./NormalUserDash";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
<>
    <Helmet>
        <title>Dashboard - Sahaya Disaster Management</title>
        <meta name="description" content="Sahaya, your reliable partner in disaster management. Discover tools and strategies for effective disaster management solutions." />
        <meta name="keywords" content="disaster management, emergency shelters, hospitals, safety tips, volunteer, Sahaya, disaster management, emergency shelters, hospitals, safety tips, volunteer, Sahaya,first aid, preparedness in disaster management, disaster management solutions, about disaster management, prevention of disaster management, emergency recovery plan, disaster management and response, disaster management includes, disaster management planning, managing natural disasters, national disaster management authority upsc, national disaster management plan 2019, national institute for disaster management, types disaster management, earthquake, floods, high, heavy, natural disasters, severity, cyclone, tornado, wildfire, evacuate, heavy rainfall" />
        <meta name="author" content="Sahaya Team" />
        <meta property="og:title" content="Sahaya Disaster Management" />
        <meta property="og:description" content="Explore tools and strategies to safeguard and empower during crises." />
      </Helmet>
    <div>
      <div className="mx-auto">
        {tab === "plans" && <GetPlan />}

        {currentUser.user.role === "admin" && (!tab || tab === "/") && (
          <AdminDashboard />
        )}
        {currentUser.user.role === "volunteer" && (!tab || tab === "/") && (
          <VolunteerDashBoard />
        )}
        {currentUser.user.role === "lead" && (!tab || tab === "/") && (
          <AdminDashboard />
        )}
      </div>
    </div>
    </>
  );
};

export default Dashboard;
