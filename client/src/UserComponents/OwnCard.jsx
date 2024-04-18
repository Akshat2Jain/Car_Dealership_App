import React from "react";

const OwnCard = ({ car }) => {
  const showcar = car;
  return (
    <>
      <div className="bg-slate-200 p-4 rounded-lg mb-6">
        <p className="text-sm text-gray-500">
          Car Name :{" "}
          <span className="font-semibold text-purple-600">
            {showcar.car_name}
          </span>
        </p>
        <p className="text-sm text-gray-500">
          Car Model :{" "}
          <span className="font-semibold text-purple-600">
            {showcar.car_model}
          </span>
        </p>
        <p className="text-sm text-gray-500">
          Car Type :{" "}
          <span className="font-semibold text-purple-600">
            {showcar.car_type}
          </span>
        </p>
        <p className="text-sm text-gray-500">
          Car Price :{" "}
          <span className="font-semibold text-purple-600">
            {showcar.car_price}
          </span>
        </p>
      </div>
    </>
  );
};

export default OwnCard;
