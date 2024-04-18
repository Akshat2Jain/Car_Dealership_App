import React from "react";
import { Link, useNavigate } from "react-router-dom";

const DealerNavbar = ({ name }) => {
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
            Welcome {name}
          </span>
          <div className="flex space-x-4">
            <button className="text-white hover:text-gray-400">
              <Link to="/dealer/dashboard/profile">Profile</Link>
            </button>
            <button className="text-white hover:text-gray-400">
              <Link to="/dealer/dashboard/postcars">Add Cars</Link>
            </button>
            <button className="text-white hover:text-gray-400">
              <Link to="/dealer/dashboard/postdeals">Add Deals</Link>
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

export default DealerNavbar;
