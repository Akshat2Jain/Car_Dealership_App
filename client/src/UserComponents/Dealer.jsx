import React, { useState, useEffect } from "react";
import UserNavabr from "./UserNavabr";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loadin from "../components/Loadin";
import DealerCard from "./DealerCard";
import { useNavigate } from "react-router-dom";

const Dealer = () => {
  const [user, setUser] = useState([]);
  const [dealer, setDealer] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const navigate = useNavigate();
  async function getUser() {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/user/getUser",
        {
          email: decoded.email,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response.data.user);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllDealers() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_HOST}/dealer/getAlldealers`
      );
      setDealer(response.data.dealers);
    } catch (error) {
      console.log(error);
    }
  }
  const handleCardClick = (dealerId) => {
    navigate(`/user/dashboard/Dealers/${dealerId}`);
  };
  useEffect(() => {
    getUser();
    getAllDealers();
  }, []);
  return (
    <>
      {loading ? (
        <>
          <Loadin />
        </>
      ) : (
        <>
          {" "}
          <div className="min-h-screen bg-gray-100 font-inter">
            <UserNavabr user={user} />
            <div className=" my-6 flex flex-wrap justify-center">
              {dealer.map((dealer, index) => (
                <>
                  <div
                    key={dealer._id}
                    onClick={() => handleCardClick(dealer._id)}
                    className="cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl"
                  >
                    <DealerCard dealer={dealer} />
                  </div>
                </>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dealer;
