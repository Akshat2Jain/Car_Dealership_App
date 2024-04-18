import React from "react";
import CarSlider from "../components/CarSlider";
import DealerSlider from "../components/DealerSlider";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <CarSlider />
        <DealerSlider />
        <Footer />
      </div>
    </>
  );
};

export default Home;
