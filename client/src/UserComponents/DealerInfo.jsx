import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CarCard from "./CarCard";
import DealCard from "./DealCard";
import { useNavigate } from "react-router-dom";

const DealerInfo = () => {
  const [dealer, setdealer] = useState("");
  const [cars, setCars] = useState([]);
  const [deals, setDeals] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  async function getDealer() {
    try {
      const dealer = await axios.post(
        `${import.meta.env.VITE_APP_HOST}/dealer//getperticulardealer`,
        {
          _id: id,
        }
      );
      setdealer(dealer.data.dealer);
      setCars(dealer.data.dealer.cars);
      setDeals(dealer.data.dealer.deals);
    } catch (error) {
      console.log(error);
    }
  }
  function handleGoBack() {
    navigate("/user/dashboard/Dealers");
  }
  useEffect(() => {
    getDealer();
  }, []);

  return (
    <>
      <div className="h-screen bg-gray-100">
        <div className="flex items-center justify-center h-16">
          <h2 className="text-2xl font-bold text-purple-600">
            {dealer.username}
          </h2>
          <button
            onClick={handleGoBack}
            className="bg-gray-200 text-gray-800 py-1 px-2 rounded-lg ml-4"
          >
            Back
          </button>
        </div>
        <div className="p-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col sm:flex-row items-center mb-4">
              <div className="text-lg font-semibold text-purple-600 mb-2 sm:mb-0 sm:mr-4">
                {dealer.username}
              </div>
              <div className="text-sm text-gray-500 mb-2 sm:mb-0 sm:mr-4">
                {dealer.email}
              </div>
              <div className="text-sm text-gray-500 mb-2 sm:mb-0 sm:mr-4">
                {dealer.location}
              </div>
              <div className="text-sm text-gray-500 mb-2 sm:mb-0 sm:mr-4">
                +91456123897
              </div>
              <div className="text-sm text-gray-500 mb-2 sm:mb-0">
                www.cardeal.com
              </div>
            </div>
            <h3 className="text-lg font-semibold text-purple-600">
              DealerShip Available Car Details
            </h3>
            <div className=" my-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cars.map((car, index) => (
                <CarCard car={car} key={index} />
              ))}
            </div>
            <h3 className="text-lg font-semibold text-purple-600">
              Find Best Deals on Car
            </h3>
            <div className="my-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {deals.map((d, index) => (
                <DealCard d={d} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealerInfo;
