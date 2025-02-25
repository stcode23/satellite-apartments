import Button from "@/components/Button";
import { Header3, Paragraph1, ParagraphLink1 } from "@/components/Text";
import React, { useState, useEffect } from "react";
import CheckAvailability from "./CheckAvailability";
import AOS from "aos";

interface BannerCarouselProps {
  imageUrls: string[];
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ imageUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  React.useEffect(() => {
      AOS.init({
        duration: 2000,
      });
  });
  
  useEffect(() => {
    // Load images from external URLs
    const imagePromises = imageUrls.map((url) => {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url;
        image.onload = () => resolve(image);
        image.onerror = reject;
      });
    });

    Promise.all(imagePromises)
      .then((loadedImages) => setImages(loadedImages as HTMLImageElement[]))
      .catch((error) => console.error("Error loading images:", error));
  }, [imageUrls]);

  useEffect(() => {
    // Automatically change images every 2 seconds
    const intervalId = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      clearInterval(intervalId); // Cleanup on unmount
    };
  }, [currentIndex, images]);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const DotIndicator: React.FC<{ active: boolean }> = ({ active }) => (
    <span
      className={`inline-block  w-2 h-2 bg-primary rounded-full mx-2 ${
        active ? "bg-secondary w-2 h-2" : "bg-primary"
      }`}
    />
  );

  const handleInnerNext = () => {
    console.log(" ");
  };

  return (
    <div className="relative container1- flex justify-center items-center">
      <div className="absolute z-10 p-2 xl:p-4">
        <div
          data-aos="zoom-in-up"
          className="flex - hidden- flex-col bg-primary w-full bounce-animation - bg-opacity-50 xl:p-8 rounded-[20px] justify-center items-center"
        >
          <div className="">
            <CheckAvailability handleInnerNext={handleInnerNext} />
          </div>
        </div>
      </div>

      <div className=" absolute xl:top-0 top-[35%] left-[0] xl:left-[200px] hidden - xl:h-full w-[full] xl:w-[400px]  bg-opacity-75 bg-white z-10">
        <div className=" flex flex-col space-y-5 p-8 xl:pt-[100px] ">
          <Header3 className=" ">Apartments & Suites </Header3>
          <Paragraph1>
            Discover the perfect blend of comfort and elegance with our
            thoughtfully designed apartments and suites. Each space is tailored
            to provide a luxurious and relaxing experience
          </Paragraph1>{" "}
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-2 w-full items-center">
            <Button
              text="Book Now"
              href="/products"
              isLink={true}
              border="border2 border-primary "
              additionalClasses="border-primary xl:w-fit- flex justify-center  w-full "
            />{" "}
            <Button
              text="Learn More"
              href="/products"
              isLink={true}
              backgroundColor="bg-p_black"
              border="border2 border-p_black "
              additionalClasses="border-primary xl:w-fit- flex justify-center  w-full "
            />{" "}
          </div>
        </div>
      </div>
      <div className="w-[100%] relative xl: h-screen [550px] h-[450px]- border- border-primary- bg-p_black   rounded-lg- mx-auto overflow-hidden rou">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={`Banner ${index + 1}`}
            className={`absolute top-0 left-0 w-[100%] mx-auto xl: h-screen [550px] opacity-85 h-[450px]- object-cover transition-transform duration-500 ${
              index === currentIndex ? "translate-x-0" : "translate-x-full"
            }`}
          />
        ))}
      </div>
      <div className="flex justify-between items-center mt-2">
        <button
          onClick={prevSlide}
          className="absolute xl:-left-4-  - left-2 top-1/2 transform -translate-y-1/2 text-bg_gray bg-black- bg-opacity-60 p-1 font-bold rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 hidden"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute bg-black- bg-opacity-60 - right-2 xl:-right-4- top-1/2 transform -translate-y-1/2  text-bg_gray p-1 font-bold rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 hidden"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
      <div className="flex- justify-center pb-2 hidden">
        {images.map((_, index) => (
          <DotIndicator key={index} active={index === currentIndex} />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
