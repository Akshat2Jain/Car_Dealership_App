import React, { useState } from "react";
import DealerNavbar from "./DealerNavbar";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const PostCars = () => {
  const [carName, setCarName] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carType, setCarType] = useState("");
  const [carPrice, setCarPrice] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_HOST}/dealer/postCars`,
        {
          car_name: carName,
          car_model: carModel,
          car_type: carType,
          car_price: carPrice,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      message.success(res.data.msg);
      navigate("/dealer/dashboard/profile");
    } catch (error) {
      message.error(error.response.data.msg);
    }
    console.log("clicked");
  };

  return (
    <>
      <DealerNavbar />
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">Add Cars To Your Dealership</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="car_name"
              className="block text-gray-700 font-bold mb-2"
            >
              Car Name
            </label>
            <input
              type="text"
              id="car_name"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              className="appearance-none border rounded-lg w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="car_model"
              className="block text-gray-700 font-bold mb-2"
            >
              Car Model
            </label>
            <input
              type="text"
              id="car_model"
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
              className="appearance-none border rounded-lg w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="car_type"
              className="block text-gray-700 font-bold mb-2"
            >
              Car Type
            </label>
            <input
              type="text"
              id="car_type"
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
              className="appearance-none border rounded-lg w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="car_price"
              className="block text-gray-700 font-bold mb-2"
            >
              Car Price
            </label>
            <input
              type="number"
              id="car_price"
              value={carPrice}
              onChange={(e) => setCarPrice(e.target.value)}
              className="appearance-none border rounded-lg w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Car
          </button>
        </form>
      </div>
    </>
  );
};

export default PostCars;
