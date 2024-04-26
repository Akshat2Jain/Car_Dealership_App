// Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import "./search.css";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  // console.log(searchSuggestions);
  return (
    <>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={async () => {
              if (searchQuery.length > 2) {
                try {
                  const response = await axios.get(
                    `${
                      import.meta.env.VITE_APP_HOST
                    }/cars/search?q=${searchQuery}`
                  );
                  setSearchSuggestions(response.data.results);
                } catch (error) {
                  console.error(error);
                }
              }
            }}
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
      <ul className="search-suggestions">
        {searchSuggestions.map((suggestion) => (
          <li key={suggestion._id} className="p-2 hover:bg-gray-200">
            <Link to={`/cars/${suggestion.id}`}>
              {suggestion.car_name} {suggestion.car_model}
            </Link>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .search-suggestions {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          z-index: 1000;
          background-color: white;
          overflow: visible;
        }
      `}</style>
    </>
  );
}

export default Navbar;
