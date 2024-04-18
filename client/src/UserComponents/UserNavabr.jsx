import React from "react";
import { Link, useNavigate } from "react-router-dom";

const UserNavabr = ({ user }) => {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }
  return (
    <>
      <nav className="bg-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center flex-col sm:flex-row">
          <span className="text-white text-lg font-medium mb-2 sm:mb-0">
            Welcome {user.username}
          </span>
          <div className="flex space-x-4">
            <button className="text-white hover:text-gray-400">
              <Link to="/user/dashboard/Profile">Profile</Link>
            </button>
            <button className="text-white hover:text-gray-400">
              <Link to="/user/dashboard/Dealers">Dealers</Link>
            </button>
            <button className="text-white hover:text-gray-400">
              <Link to="/user/dashboard/Cars">Your Vechicles</Link>
            </button>
            <button
              className="text-white hover:text-gray-400"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default UserNavabr;
