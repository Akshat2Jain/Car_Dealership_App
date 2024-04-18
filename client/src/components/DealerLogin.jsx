import React, { useState } from "react";
import { message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DealerLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/dealer/signin", {
        password: formData.password,
        email: formData.email,
      });
      // if (response.response)
      message.success(response.data.msg);
      localStorage.setItem("token", response.data.token);
      navigate("/dealer/dashboard");
    } catch (error) {
      console.log(error.response.data.msg);
      message.error(error.response.data.msg);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
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

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Login as Dealer
        </button>
      </form>
    </>
  );
};

export default DealerLogin;
