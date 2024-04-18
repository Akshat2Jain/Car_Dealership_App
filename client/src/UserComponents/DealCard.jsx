import React, { useState, useEffect } from "react";
import axios from "axios";

const DealCard = ({ d }) => {
  const [deal, setdeal] = useState("");
  const [showcar, setshowcar] = useState("");
  async function getDeal() {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_HOST}/dealer/getDeal`,
        {
          id: d,
        }
      );
      setdeal(res.data.deal);
    } catch (error) {
      console.log(error);
    }
  }
  async function getCar() {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_HOST}/dealer/getPerticularCar`,
        {
          id: deal.car_id,
        }
      );
      setshowcar(res.data.responsecar);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getDeal();
  }, []);

  useEffect(() => {
    if (deal) {
      getCar();
    }
  }, [deal]);
  return (
    <>
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <p className="text-sm text-gray-500">
          Car Name :{" "}
          <span className="font-semibold text-purple-600">
            {showcar?.car_name}
          </span>
        </p>
        <p className="text-sm text-gray-500">
          Car Model :{" "}
          <span className="font-semibold text-purple-600">
            {" "}
            {showcar?.car_model}
          </span>
        </p>
        <p className="text-sm text-gray-500">
          Car Type :{" "}
          <span className="font-semibold text-purple-600">
            {showcar?.car_type}
          </span>
        </p>
        <p className="text-sm text-gray-500">
          Car Price :{" "}
          <span className="font-semibold text-purple-600">
            {showcar?.car_price}
          </span>
        </p>
        <p className="text-sm text-gray-500">
          Car Deal :{" "}
          <span className="font-semibold text-purple-600">
            {deal?.deal_info?.deal_text}
          </span>
        </p>

        <button className="bg-purple-600 my-3 text-white py-1 px-2 rounded-lg hover:bg-purple-700">
          Buy This Deal
        </button>
      </div>
    </>
  );
};

export default DealCard;
