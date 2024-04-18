import React, { useState, useEffect } from "react";
import DealerNavbar from "./DealerNavbar";
import axios from "axios";
import Loadin from "../components/Loadin";
import DealerCard from "./DealerCard";
import DealCard from "./DealCard";

const DealerProfile = () => {
  const [showdealer, setshowDealer] = useState("");
  const [cars, setCars] = useState([]);
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  async function getDealer() {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_HOST}/dealer/getDealer`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setshowDealer(res.data.dealer);
      setCars(res.data.dealer.cars);
      setDeals(res.data.dealer.deals);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getDealer();
  }, []);
  return (
    <>
      {loading ? (
        <>
          <Loadin />
        </>
      ) : (
        <>
          <div className="min-h-screen bg-gray-100 font-inter">
            <DealerNavbar name={showdealer.username} />
            <div className="container mx-auto px-4 py-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Profile Information
                </h2>

                <div className="flex flex-col sm:flex-row items-center sm:space-x-6 mb-6">
                  {/* Photo field */}
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4 sm:mb-0">
                    <img
                      src="https://i.pinimg.com/originals/6d/5f/c6/6d5fc60bae3dc6139eefa31af206596f.jpg"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Profile details */}
                  <div className="flex-grow">
                    {/* Name */}
                    <div className="mb-4">
                      <label className="block text-gray-600 font-medium mb-1">
                        Name
                      </label>
                      <p className="text-lg font-medium text-gray-800">
                        {showdealer.username}
                      </p>
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                      <label className="block text-gray-600 font-medium mb-1">
                        Email
                      </label>
                      <p className="text-lg font-medium text-gray-800">
                        {showdealer.email}
                      </p>
                    </div>

                    {/* Location */}
                    <div className="mb-4">
                      <label className="block text-gray-600 font-medium mb-1">
                        Location
                      </label>
                      <p className="text-lg font-medium text-gray-800">
                        {showdealer.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Edit profile button (optional) */}
              </div>
            </div>
            <h3 className="mx-4 text-lg font-semibold text-purple-600">
              DealerShip Available Car Details
            </h3>
            <div className="mx-4 my-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cars.map((car, index) => (
                <DealerCard car={car} />
              ))}
            </div>
            <h3 className=" mx-4 text-lg font-semibold text-purple-600">
              Your Deals on Car
            </h3>
            <div className="mx-4 my-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {deals.map((d, index) => (
                <DealCard d={d} key={index} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DealerProfile;
