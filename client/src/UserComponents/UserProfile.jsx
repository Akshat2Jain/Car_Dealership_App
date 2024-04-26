import React, { useEffect, useState } from "react";
import UserNavabr from "./UserNavabr";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loadin from "../components/Loadin";

const UserProfile = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const navigate = useNavigate();
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
  const handleEditProfile = () => {
    navigate("/user/updateProfile");
  };
  useEffect(() => {
    getUser();
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
            <UserNavabr user={user} />
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
                        {user.username}
                      </p>
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                      <label className="block text-gray-600 font-medium mb-1">
                        Email
                      </label>
                      <p className="text-lg font-medium text-gray-800">
                        {user.email}
                      </p>
                    </div>

                    {/* Location */}
                    <div className="mb-4">
                      <label className="block text-gray-600 font-medium mb-1">
                        Location
                      </label>
                      <p className="text-lg font-medium text-gray-800">
                        {user.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Edit profile button (optional) */}
                <div className="flex justify-end">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
                    onClick={handleEditProfile}
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserProfile;
