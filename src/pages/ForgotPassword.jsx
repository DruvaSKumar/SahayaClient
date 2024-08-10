import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, TextInput, Label, Spinner } from "flowbite-react";
import { BASE_URL } from "../api/apiservice";
import { Helmet } from "react-helmet";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/user/forgotPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
<>
    <Helmet>
        <title>ForgotPassword - Sahaya Disaster Management</title>
        <meta name="description" content="Sahaya, your reliable partner in disaster management. Discover tools and strategies for effective disaster management solutions." />
        <meta name="keywords" content="disaster management, emergency shelters, hospitals, safety tips, volunteer, Sahaya" />
        <meta name="author" content="Sahaya Team" />
        <meta property="og:title" content="Sahaya Disaster Management" />
        <meta property="og:description" content="Explore tools and strategies to safeguard and empower during crises." />
      </Helmet>
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-4 bg-white rounded shadow-md"
      >
        <h1 className="text-2xl mb-4 text-center">Forgot Password</h1>
        <div className="mb-4">
          <Label htmlFor="email" className="block text-sm font-bold mb-2">
            Email
          </Label>
          <TextInput
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          color="success"
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner size="sm" className="mr-2" />
              Sending...
            </>
          ) : (
            "Send Reset Link"
          )}
        </Button>
      </form>
    </div>
    </>
  );
};

export default ForgotPassword;
