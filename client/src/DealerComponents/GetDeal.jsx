import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
const GetDeal = ({ car }) => {
  const [showcar, setshowcar] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
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
      console.log(error.response);
      message.error(error.response.data.msg);
    }
  }
  async function handleCreateDeal() {
    let dealInput = "";
    do {
      dealInput = prompt("Enter deal Caption:");
    } while (!dealInput.trim());
    {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_APP_HOST}/dealer/createdeal/${car}`,
          {
            deal_info: {
              deal_text: dealInput,
            },
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // console.log(res.data);
        message.success(res.data.msg);
      } catch (error) {
        message.error(error.response.data.msg);
      }
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
        <button
          onClick={handleCreateDeal}
          className="bg-purple-600 my-3 text-white py-1 px-2 rounded-lg hover:bg-purple-700"
        >
          Create deal on this Car
        </button>
      </div>
    </>
  );
};

export default GetDeal;
