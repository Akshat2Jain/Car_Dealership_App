import React, { useState, useEffect } from "react";
import UserNavabr from "./UserNavabr";
import axios from "axios";
import Loadin from "../components/Loadin";
import { jwtDecode } from "jwt-decode";
import OwnCard from "./OwnCard";
const OwnCars = () => {
  const [user, setUser] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);

  async function getUser() {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_APP_HOST}/user/getUser`,
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
  async function getOwnCars() {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_HOST}/user/ownedVechile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCars(res.data.OwnCars);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUser();

    getOwnCars();
  }, []);
  return (
    <>
      {loading ? (
        <>
          <Loadin />
        </>
      ) : (
        <>
          <UserNavabr user={user} />
          <div className="h-screen bg-gray-100">
            <div className="flex items-center justify-center h-16">
              <h2 className="text-2xl font-bold text-purple-600">Your Cars</h2>
            </div>
            <div className=" my-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cars?.map((car, index) => (
                <OwnCard car={car} key={index} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OwnCars;
