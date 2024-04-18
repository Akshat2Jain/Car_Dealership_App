import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DealerCard = ({ car }) => {
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
  useEffect(() => {
    getCar();
  }, []);
  return (
    <>
      <div className="bg-gray-200 p-4 rounded-lg mb-6">
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
      </div>
    </>
  );
};

export default DealerCard;
