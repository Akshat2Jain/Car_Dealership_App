// CarSlider.js
import React from "react";
import Slider from "react-slick";

function CarSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const carImages = [
    // Add your car image URLs here
    "https://stimg.cardekho.com/images/carexteriorimages/930x620/Tata/Punch/10681/1691392713058/front-left-side-47.jpg",
    "https://stimg.cardekho.com/images/carexteriorimages/930x620/Audi/Q8-2024/11087/1693916254117/front-left-side-47.jpg",
    "https://stimg.cardekho.com/images/carexteriorimages/630x420/Mercedes-Benz/E-Class/10855/1690452177573/front-left-side-47.jpg?impolicy=resize&imwidth=360",
  ];

  return (
    <div className="my-2">
      <Slider {...settings}>
        {carImages.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Car ${index + 1}`}
              className="w-full h-80 object-cover rounded"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CarSlider;
