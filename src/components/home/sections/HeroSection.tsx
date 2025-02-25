/** @format */

import React from "react";
import BannerCarousel from "./others/Banner";

const HomePage = () => {
  const imageUrls = [
    "https://res.cloudinary.com/dvao98wnj/image/upload/v1738849472/lagos-pic-13_nc3jec.jpg",
    "https://res.cloudinary.com/dvao98wnj/image/upload/v1738849472/385327d1_edited_a943_1_nhssvp.webp",
    "https://res.cloudinary.com/dvao98wnj/image/upload/v1738849472/lagos-pic-13_nc3jec.jpg",
  ];

  return (
    <div className="  pt-[60px] ">
      <div className="bg-black text-white pt-[70px] hidden ">
        <div className="flex py-2 container1-">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
          </div>
        </div>
      </div>
      <BannerCarousel imageUrls={imageUrls} />

    
    </div>
  );
};

export default HomePage;
