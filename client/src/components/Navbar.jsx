// Navbar.js
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 flex flex-col md:flex-row justify-between items-center">
      {/* Logo */}
      <div className="text-white text-2xl my-4">
        <Link to="/">CarDEAL.com</Link>
        {/* <img src="/path/to/logo.png" alt="Logo" className="h-8 w-auto" /> */}
      </div>

      {/* Search Bar */}
      <div className="flex w-full md:mx-4 md:w-auto">
        <input
          type="text"
          placeholder="Search cars..."
          className="p-2 rounded w-full md:w-64 text-sm"
        />
      </div>

      {/* Login/Signup Buttons */}
      <div className="flex w-full md:w-auto mt-2 md:mt-0 justify-center md:justify-start my-2">
        <button className="text-white text-sm md:text-base mr-4 hover:bg-gray-700 py-1 px-3 rounded">
          <Link to="/login">Login</Link>
        </button>
        <button className="text-white text-sm md:text-base bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
          <Link to="/signup">Sign Up</Link>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
