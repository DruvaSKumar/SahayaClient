import React, { useState } from "react";
import { BASE_URL } from "../api/apiservice";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

const DonateSupplies = () => {
  const [formData, setFormData] = useState({
    type: "",
    quantity: "",
    contactInfo: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/donations/supplies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Donation submitted successfully!");
        setFormData({
          type: "",
          quantity: "",
          contactInfo: "",
          description: "",
        });
      } else {
        toast.error("Failed to submit the donation. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting donation:", error);
      toast.error("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
    <Helmet>
        <title>DonateSupplies - Sahaya Disaster Management</title>
        <meta name="description" content="Sahaya, your reliable partner in disaster management. Discover tools and strategies for effective disaster management solutions." />
        <meta name="keywords" content="disaster management, emergency shelters, hospitals, safety tips, volunteer, Sahaya, disaster management, emergency shelters, hospitals, safety tips, volunteer, Sahaya,first aid, preparedness in disaster management, disaster management solutions, about disaster management, prevention of disaster management, emergency recovery plan, disaster management and response, disaster management includes, disaster management planning, managing natural disasters, national disaster management authority upsc, national disaster management plan 2019, national institute for disaster management, types disaster management, earthquake, floods, high, heavy, natural disasters, severity, cyclone, tornado, wildfire, evacuate, heavy rainfall" />
        <meta name="author" content="Sahaya Team" />
        <meta property="og:title" content="Sahaya Disaster Management" />
        <meta property="og:description" content="Explore tools and strategies to safeguard and empower during crises." />
      </Helmet>
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-1/2 flex items-center justify-center">
        <img src="/donation.png" alt="Donate Supplies" class="w-40 h-40" />
      </div>
      <div className="md:w-1/2 flex items-center justify-center ">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-2 text-green-500">
            Donate Supplies
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div>
              <Label htmlFor="type" value="Type of Supplies" />
              <TextInput
                id="type"
                name="type"
                type="text"
                placeholder="E.g., food, clothing, medical"
                value={formData.type}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="quantity" value="Quantity" />
              <TextInput
                id="quantity"
                name="quantity"
                type="number"
                placeholder="Enter quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="contactInfo" value="Contact Information" />
              <TextInput
                id="contactInfo"
                name="contactInfo"
                type="text"
                placeholder="Enter your contact information"
                value={formData.contactInfo}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="description" value="Description/Message" />
              <Textarea
                id="description"
                name="description"
                placeholder="Additional details"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" color="success" disabled={loading}>
              {loading ? "Submitting..." : "Donate "}
            </Button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
    </>
  );
};

export default DonateSupplies;
