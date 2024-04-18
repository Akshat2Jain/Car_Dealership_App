import React, { useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const DealerSignUp = () => {
  const [formData, setFormData] = useState({
    dealerName: "",
    email: "",
    password: "",
    location: "",
  });
  const navigate = useNavigate();

  // Handler function to manage input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    console.log(formData);
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/dealer/signup", {
        username: formData.dealerName,
        email: formData.email,
        password: formData.password,
        location: formData.location,
      });
      message.success(res.data.msg);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="dealerName"
            className="block text-sm font-medium text-gray-700"
          >
            Dealer Name:
          </label>
          <input
            type="text"
            id="dealerName"
            name="dealerName"
            value={formData.dealerName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Sign Up as Dealer
        </button>
      </form>
    </>
  );
};

export default DealerSignUp;
