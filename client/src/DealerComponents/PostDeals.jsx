import React, { useState, useEffect } from "react";
import DealerNavbar from "./DealerNavbar";
import axios from "axios";
import Loadin from "../components/Loadin";
import DealerCard from "./DealerCard";
import { message } from "antd";
import GetDeal from "./GetDeal";

const PostDeals = () => {
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
                <h3 className="mx-4 text-lg font-semibold text-purple-600">
                  DealerShip Available Car Details
                </h3>
                <div className="mx-4 my-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {cars.map((car, index) => (
                    <GetDeal car={car} key={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PostDeals;
