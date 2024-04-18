import React, { useState } from "react";
import UserSignUp from "../components/UserSignUp";
import DealerSignUp from "../components/DealerSignUp";
import Navbar from "../components/Navbar";

const SignupPage = () => {
  const [activeTab, setActiveTab] = useState("user");
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="font-serif text-2xl ">Sign Up</h1>
          {/* Navigation bar */}
          <div className="flex justify-center mb-4">
            <button
              className={`px-4 py-2 font-medium text-lg ${
                activeTab === "user"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("user")}
            >
              User
            </button>
            <button
              className={`px-4 py-2 font-medium text-lg ${
                activeTab === "dealer"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("dealer")}
            >
              Dealer
            </button>
          </div>

          {/* Conditionally render forms based on the active tab */}
          {activeTab === "user" ? <UserSignUp /> : <DealerSignUp />}
        </div>
      </div>
    </>
  );
};

export default SignupPage;
