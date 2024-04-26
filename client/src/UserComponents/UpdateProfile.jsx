import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { message } from "antd";

const UpdateProfile = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
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
      setUsername(response.data.user.username);
      setLocation(response.data.user.location);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_HOST}/user/updateProfile`,
        {
          username: username,
          location: location,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      message.success(res.data.msg);
      setLoading(false);
      navigate("/user/dashboard/profile");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <div className="min-h-screen bg-gray-100 font-inter">
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Update Profile
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Username */}
              <div className="mb-4">
                <label className="block text-gray-600 font-medium mb-1">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={username}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* Password */}

              {/* Location */}
              <div className="mb-4">
                <label className="block text-gray-600 font-medium mb-1">
                  Location
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={location}
                  required
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              {/* Submit button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
                >
                  {loading ? "Updating..." : "Update Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
