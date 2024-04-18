import axios from "axios";
import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
  const [showcar, setshowcar] = useState("");
  const navigate = useNavigate();
  async function getCar() {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_HOST}/dealer/getPerticularCar`,
        {
          id: car,
        }
      );
      setshowcar(res.data.responsecar);
    } catch (error) {
      console.log(error);
    }
  }
  const token = localStorage.getItem("token");
  async function handlePurchaseCar() {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_HOST}/user/buyCar/${showcar._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      message.success(res.data.msg);
      setTimeout(() => {
        navigate("/user/dashboard/Cars");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCar();
  }, []);

  return (
    <>
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <p className="text-sm text-gray-500">
          Car Name :{" "}
          <span className="font-semibold text-purple-600">
            {showcar.car_name}
          </span>
        </p>
        <p className="text-sm text-gray-500">
          Car Model :{" "}
          <span className="font-semibold text-purple-600">
            {showcar.car_model}
          </span>
        </p>
        <p className="text-sm text-gray-500">
          Car Type :{" "}
          <span className="font-semibold text-purple-600">
            {showcar.car_type}
          </span>
        </p>
        <p className="text-sm text-gray-500">
          Car Price :{" "}
          <span className="font-semibold text-purple-600">
            {showcar.car_price}
          </span>
        </p>
        <button
          className="bg-purple-600 my-3 text-white py-1 px-2 rounded-lg hover:bg-purple-700"
          onClick={handlePurchaseCar}
        >
          Buy This Car
        </button>
      </div>
    </>
  );
};

export default CarCard;
