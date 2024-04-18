import React from "react";

const DealerCard = ({ dealer }) => {
  return (
    <>
      <div className="bg-gradient-to-r from-purple-400 to-red-500 shadow-lg rounded-lg p-6 m-4 w-80">
        <div className="flex justify-center mb-4">
          <img
            src="https://i.pinimg.com/originals/6d/5f/c6/6d5fc60bae3dc6139eefa31af206596f.jpg"
            alt="image"
            className="rounded-full h-24 w-24 object-cover shadow-md border-4 border-white"
          />
        </div>
        {/* Username */}
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          {dealer.username}
        </h2>
        <div className="bg-purple-200 p-4 rounded-lg shadow-md">
          {/* Email */}
          <div className="mb-4">
            <strong>Email :</strong> {dealer.email}
          </div>

          {/* Cars */}
          <div className="mb-4">
            <strong>Number of Cars : </strong>
            <span>{dealer.cars.length}</span>
          </div>

          {/* Deals */}
          <div className="mb-4">
            <strong>No of Deals : </strong>
            <span>{dealer.deals.length}</span>
          </div>

          {/* Sold Vehicle */}
          <div>
            <strong>Sold Vehicle : </strong>
            <span>{dealer.sold_vehicle.length}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealerCard;
