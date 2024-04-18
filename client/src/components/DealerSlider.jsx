// DealerSlider.js
import React from "react";
import Slider from "react-slick";

function DealerSlider() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3, // Set the default slides to show to 3
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const dealers = [
    {
      name: "Dealer 1",
      description: "Description for Dealer 1",
      image:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
    },
    {
      name: "Dealer 2",
      description: "Description for Dealer 2",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8Mi70_PFS_8t2JF0h5gwVFw7SQBe7zclIffoA5a3TPg&s",
    },
    {
      name: "Dealer 3",
      description: "Description for Dealer 3",
      image:
        "https://www.shutterstock.com/image-photo/young-handsome-man-beard-wearing-260nw-1768126784.jpg",
    },
    // Add more dealers as needed
  ];

  return (
    <div className="my-4">
      <Slider {...settings}>
        {dealers.map((dealer, index) => (
          <div key={index} className="p-2">
            <div className="bg-white p-4 rounded shadow-md">
              <img
                src={dealer.image}
                alt={dealer.name}
                className="w-full h-60 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold text-lg">{dealer.name}</h3>
              <p className="text-gray-600 text-sm">{dealer.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default DealerSlider;
